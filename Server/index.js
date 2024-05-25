import express from "express";
import dotenv from "dotenv";
import registerRoute from "./routes/registerRoute.js";
import loginRoute from "./routes/loginRoute.js";
import verifyToken from "./middleware/verifyToken.js";
import userBio from "./routes/userBioRoute.js";
import mpesaAccess from "./routes/mpesaTokenRoute.js";
import { access, stkPush } from "./controllers/mpesaStk.js";

dotenv.config();

const app = express();

app.use(express.json());

/* ROUTES */
app.use("/register", registerRoute);
app.use("/login", loginRoute);

app.use("/addBio", verifyToken, userBio);
app.use("/accessToken", verifyToken, access, mpesaAccess);
app.use("/accessToken/stkpush", verifyToken, access, stkPush);

app.listen(4700, () => console.log("Server running on port 4700"));
