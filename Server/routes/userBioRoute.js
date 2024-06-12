import { Router } from "express";
import {
  checkUsername,
  addUserBio,
  updateBio,
  deleteUser,
  getBio,
} from "../controllers/userBio.js";

const router = Router();

router.post("/", addUserBio);

router.get("/getBio", getBio);

router.post("/check-username", checkUsername);

router.post("/updateBio", updateBio);

router.delete("/deleteAccount", deleteUser);

export default router;
