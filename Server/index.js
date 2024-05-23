import express from "express";
import dotenv from "dotenv";
import registerRoute from "./routes/registerRoute.js";
import loginRoute from "./routes/loginRoute.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Running..." });
});

/* ROUTES */
app.use("/register", registerRoute);
app.use("/login", loginRoute);

app.listen(4700, () => console.log("Server running on port 4700"));
