import { Router } from "express";
import {
  checkUsername,
  addUserBio,
  updateBio,
} from "../controllers/userBio.js";

const router = Router();

router.post("/", addUserBio);

router.post("/check-username", checkUsername);

router.post("/updateBio", updateBio);

export default router;
