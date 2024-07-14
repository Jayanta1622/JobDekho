import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Job } from "../models/job.model.js";

const addJob = asyncHandler(async (req, res) => {
  const { job_title, job_description, required_skills, required_experience } =
    req.body;
  const added_by = req?.user?._id;

  if (
    [job_title, job_description, required_experience].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required!!");
  }

  if (required_skills.length <= 0) {
    throw new ApiError(400, "Atleast one skill is required!!");
  }
  console.log(added_by)

  const new_job = await new Job.create({
    added_by,
    job_title,
    job_description,
    required_skills,
    required_experience,
  });

  if(!new_job){
    throw new ApiError(400, "Something went worng in Addition of job!!");
  }

  return res.status(201).json(new ApiResponse(200, new_job, "Job added successfuly!!"));
});
export { addJob };
