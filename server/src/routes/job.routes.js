import { Router } from "express";
import { addJob, getJobById } from "../controllers/job.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();
router.route("/addjob").post(verifyJWT,addJob);
router.route("/getjobbyid").post( getJobById);

export default router;