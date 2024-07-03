import axios from "axios";
import supabase from "./supabaseConfig.js";

/* ACCESS TOKEN FUNCTION */
const access = async (req, res, next) => {
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
    console.error(
      "Error details:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

/* STK-Push FUNCTION */
const stkPush = async (req, res) => {
  /* GETTING SHORTCODE FROM DB */
  const { username } = req.body;

  const { data: userBio, error: userBioError } = await supabase
    .from("user_bio")
    .select("*")
    .eq("username", username)
    .single();

  if (userBioError) {
    return res.status(400).json({ message: "Username not found" });
  }

  const userId = userBio.user_id;

  const { data: accountDetail, error: accountDetailError } = await supabase
    .from("account_details")
    .select("shortcode")
    .eq("user_id", userId)
    .single();

  if (accountDetailError) {
    return res.status(400).json({ message: "Shortcode not found" });
  }

  const shortcode = accountDetail.shortcode;

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

  const password = Buffer.from(
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
      .json({ message: "An error occurred!", error: error.message });
  }
};

const saveToDatabase = async (values) => {
  try {
    const { data: transaction, error } = await supabase
      .from("transaction")
      .insert([
        {
          merchant_request_id: values.MerchantRequestID,
          checkout_request_id: values.CheckoutRequestID,
          result_code: values.ResultCode,
          result_description: values.ResultDesc,
          amount: values.Amount,
          mpesa_receipt_number: values.MpesaReceiptNumber,
          balance: values.Balance,
          transaction_date: values.TransactionDate,
          phone_number: values.PhoneNumber,
        },
      ])
      .single();

    if (error) {
      throw error;
    }

    return transaction;
  } catch (error) {
    console.error({ error: "transaction missing" });
  }
};

const saveTransaction = async (req, res) => {
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
    Balance: data.CallbackMetadata?.Item[2]?.Value || 0,
    TransactionDate: data.CallbackMetadata?.Item[3].Value,
    PhoneNumber: data.CallbackMetadata?.Item[4].Value,
  };

  const savedTransaction = await saveToDatabase(transaction);

  if (savedTransaction) {
    console.log("Transaction saved");
    res.sendStatus(200);
  } else {
    res.status(500).json({ error: "Failed to save transaction" });
  }
};

export { access, stkPush, saveTransaction };
