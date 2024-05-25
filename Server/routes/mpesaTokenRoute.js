import { Router } from "express";
import { getPrompt, stkPush } from "../controllers/mpesaStk.js";

const router = Router();

router.get("/", getPrompt);

router.post("/stkpush", stkPush);

export default router;
