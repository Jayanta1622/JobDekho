import { Router } from "express";
import {
  addJob,
  applyToAJob,
  getJobById,
} from "../controllers/job.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();
router.route("/addjob").post(verifyJWT, addJob);
router.route("/getjobbyid").post(getJobById);
router.route("/applyjob").post(
  verifyJWT,
  upload.fields([
    {
      name: "resume",
      maxCount: 1,
    },
  ]),
  applyToAJob
);

export default router;
