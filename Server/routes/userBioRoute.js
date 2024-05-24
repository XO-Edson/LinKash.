import { Router } from "express";
import addUserBio from "../controllers/userBio.js";

const router = Router();

router.post("/", addUserBio);

export default router;
