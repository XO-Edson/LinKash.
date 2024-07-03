import { Router } from "express";
import { stkPush } from "../controllers/mpesaStk.js";

const router = Router();

router.post("/", stkPush);

export default router;
