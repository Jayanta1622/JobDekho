import { Router } from "express";
import { addJob } from "../controllers/job.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();
router.route("/addjob").post(verifyJWT,addJob);

export default router;