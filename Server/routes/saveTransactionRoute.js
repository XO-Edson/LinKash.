import { Router } from "express";
import { saveTransaction } from "../controllers/mpesaStk.js";

const router = Router();

router.post("/", saveTransaction);

export default router;
