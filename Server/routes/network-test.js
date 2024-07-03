import axios from "axios";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const data = {
    ShortCode: "174379",
    phone: req.body.phone,
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

    res
      .status(200)
      .json({ message: "API endpoint is accessible", data: response.data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to access API endpoint", error: error.message });
  }
});

export default router;
