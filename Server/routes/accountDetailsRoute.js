import express from "express";
import accountInfo from "../controllers/accountDetails.js";

const router = express.Router();

router.post("/", accountInfo);

export default router;
