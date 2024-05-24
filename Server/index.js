import express from "express";
import dotenv from "dotenv";
import registerRoute from "./routes/registerRoute.js";
import loginRoute from "./routes/loginRoute.js";
import verifyToken from "./middleware/verifyToken.js";
import userBio from "./routes/userBioRoute.js";
import mpesaAccess from "./routes/mpesaTokenRoute.js";
import { access, register } from "./controllers/mpesaStk.js";

dotenv.config();

const app = express();

app.use(express.json());

/* app.use("/", (req, res) => {
  res.status(200).json({ message: "Running..." });
}); */

/* ROUTES */
app.use("/register", registerRoute);
app.use("/login", loginRoute);

app.use("/addBio", verifyToken, userBio);
app.use("/accessToken", verifyToken, access, mpesaAccess);
app.use("/registerMpesa", verifyToken, access, register);

app.listen(4700, () => console.log("Server running on port 4700"));
