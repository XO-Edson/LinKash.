import { Router } from "express";
import { getPrompt } from "../controllers/mpesaStk.js";

const router = Router();

router.get("/", getPrompt);

export default router;
