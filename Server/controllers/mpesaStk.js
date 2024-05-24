import axios from "axios";
import { json } from "express";

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

const register = async (req, res) => {
  let auth = `Bearer ${req.access_token}`;
  try {
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl",
      {
        ShortCode: "600984",
        ResponseType: "Completed",
        ConfirmationURL: "http://105.161.196.105/confitmation",
        ValidationURL: "http://105.161.196.105/validation_url",
      },
      {
        headers: {
          Authorization: auth,
          "Content-Type": "application/json",
        },
      }
    );
    //console.log(response.data);

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const getPrompt = (req, res) => {
  res.status(200).json({ access_token: req.access_token });
};

export { getPrompt, access, register };
