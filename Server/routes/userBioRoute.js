import { Router } from "express";
import { checkUsername, addUserBio } from "../controllers/userBio.js";

const router = Router();

router.post("/", addUserBio);

router.post("/check-username", checkUsername);

export default router;
