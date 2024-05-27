import { Router } from "express";
import { stkPush } from "../controllers/mpesaStk.js";

const router = Router();

router.post("/stkpush", stkPush);

export default router;
