import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import registerRoute from "../routes/registerRoute.js";
import loginRoute from "../routes/loginRoute.js";
import verifyToken from "../middleware/verifyToken.js";
import userBio from "../routes/userBioRoute.js";
import accountsRoute from "../routes/accountDetailsRoute.js";
import { access, stkPush } from "../controllers/mpesaStk.js";
import saveTransactionRoute from "../routes/saveTransactionRoute.js";
import { accountProfile } from "../controllers/accountDetails.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:4700', 'https://lin-kash-client.vercel.app/"],
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://lin-kash-client.vercel.app/"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
}); */

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server running okay..." });
});

/* AUTH ROUTES */
app.use("/register", registerRoute);
app.use("/login", loginRoute);

/* ROUTES */
app.use("/addBio", verifyToken, userBio);
app.use("/accountDetails", verifyToken, accountsRoute);

app.use("/stkpush", access, stkPush);
app.use("/stkCallback", saveTransactionRoute);

/* PAYMENT ROUTE */
app.get("/:username", accountProfile);

app.listen(4700, () => console.log("Server running on port 4700"));
