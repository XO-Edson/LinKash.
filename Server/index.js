import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import registerRoute from "./routes/registerRoute.js";
import loginRoute from "./routes/loginRoute.js";
import verifyToken from "./middleware/verifyToken.js";
import userBio from "./routes/userBioRoute.js";
import accountsRoute from "./routes/accountDetailsRoute.js";
import { access, stkPush } from "./controllers/mpesaStk.js";
import saveTransactionRoute from "./routes/saveTransactionRoute.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* AUTH ROUTES */
app.use("/register", registerRoute);
app.use("/login", loginRoute);

/* ROUTES */
app.use("/addBio", verifyToken, userBio);
app.use("/addBio/check-username", verifyToken, userBio);
app.use("/accountDetails", verifyToken, accountsRoute);
app.use("/stkpush", verifyToken, access, stkPush);
app.use("/stkCallback", verifyToken, saveTransactionRoute);

app.listen(4700, () => console.log("Server running on port 4700"));
