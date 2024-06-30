import axios from "axios";
import pool from "../config/db.js";

/* ACCESS TOKEN FUNCTION */
async function access(req, res, next) {
  try {
    let auth = Buffer.from(
      "QGkAJzr4kHwWFoPhNPCISF3ksa0tCE3mv3XeGh9BmrJ7v7aF:pI99cgAU9YmS5XU9ySzCdkpz8KCKR7mQNvXt2A88wzrNoKwVz41q9FPNcFOSfVky"
    ).toString("base64");

    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    req.access_token = response.data.access_token;

    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
}

/* STK-Push FUNCTION */
const stkPush = async (req, res) => {
  /* GETTING SHORTCODE FROM DB */
  const { username } = req.body;

  const checkUsername = await pool.query(
    "SELECT * FROM user_bio WHERE username = $1",
    [username]
  );
  const userId = checkUsername.rows[0].user_id;

  const result = await pool.query(
    "SELECT shortcode FROM account_details WHERE user_id = $1",
    [userId]
  );

  const shortcode = result.rows[0].shortcode;

  const data = {
    ShortCode: shortcode,
    phone: req.body.phone.substring(1),
    amount: req.body.amount,
    passkey: process.env.STKPUSH_KEY,
    url: "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
  };

  const date = new Date();
  const timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);

  const password = new Buffer.from(
    data.ShortCode + data.passkey + timestamp
  ).toString("base64");

  const reqBody = {
    BusinessShortCode: data.ShortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: data.amount,
    PartyA: `254${data.phone}`,
    PartyB: data.ShortCode,
    PhoneNumber: `254${data.phone}`,
    CallBackURL: "https://lin-kash-server.vercel.app/stkCallback",
    AccountReference: "Mpesa Test",
    TransactionDesc: "Test stk",
  };

  try {
    const response = await axios.post(data.url, reqBody, {
      headers: {
        authorization: `Bearer ${req.access_token}`,
        "Content-Type": "application/json",
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const saveToDatabase = async (values) => {
  try {
    const result = await pool.query(
      "INSERT INTO transaction (merchant_request_id,checkout_request_id,result_code,result_description,amount,mpesa_receipt_number,balance,transaction_date,phone_number) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
      [
        values.MerchantRequestID,
        values.CheckoutRequestID,
        values.ResultCode,
        values.ResultDesc,
        values.Amount,
        values.MpesaReceiptNumber,
        values.Balance,
        values.TransactionDate,
        values.PhoneNumber,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error({ error: "transaction missing" });
  }
};

const saveTransaction = (req, res) => {
  console.log(req.body);

  const data = req.body.Body.stkCallback;
  console.log(data);

  if (!data || !data.CallbackMetadata || !data.CallbackMetadata.Item) {
    console.error("Invalid transaction data");
    return res.status(400).json({ error: "Invalid transaction data" });
  }

  const transaction = {
    MerchantRequestID: data.MerchantRequestID,
    CheckoutRequestID: data.CheckoutRequestID,
    ResultCode: data.ResultCode,
    ResultDesc: data.ResultDesc,
    Amount: data.CallbackMetadata?.Item[0].Value,
    MpesaReceiptNumber: data.CallbackMetadata?.Item[1].Value,
    Balance: data.CallbackMetadata?.Item[2].Value,
    TransactionDate: data.CallbackMetadata?.Item[3].Value,
    PhoneNumber: data.CallbackMetadata?.Item[4].Value,
  };

  saveToDatabase(transaction);

  console.log("Transaction saved");

  res.sendStatus(200);
};

export { access, stkPush, saveTransaction };
