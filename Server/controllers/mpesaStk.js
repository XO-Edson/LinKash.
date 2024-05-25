import axios from "axios";

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
  const data = {
    ShortCode: 174379,
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
    CallBackURL: "https://mydomain.com/pat",
    AccountReference: "MpesaTest",
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

const getPrompt = (req, res) => {
  res.status(200).json({ access_token: req.access_token });
};

export { getPrompt, access, stkPush };
