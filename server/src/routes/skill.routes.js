import { Router } from "express";
import { addSkill } from "../controllers/skill.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();
router.route("/addskill").post(verifyJWT ,addSkill);

export default router;
