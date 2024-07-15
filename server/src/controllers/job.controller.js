import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Job } from "../models/job.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { AppliedData } from "../models/appliedData.model.js";

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

  const new_job = await Job.create({
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

const getJobById= asyncHandler(async(req,res)=>{
  const {job_id}= req.body;

  const job = await Job.findOne({ _id: job_id }).populate('required_skills').populate('applyed_details');

  if(!job){
    throw new ApiError(400, "No job found!!");
  }

  return res.status(201).json(new ApiResponse(200, job, "Got Job Successfully!!"));
});

const applyToAJob= asyncHandler(async(req,res)=>{
  const applied_by= req.user._id;
  const {job_id, experience}=req.body;

  if(!job_id){
    throw new ApiError(400, "Job id Required!!");
  }

  const isJobExists= await Job.findOne({_id:job_id});

  if(!isJobExists){
    throw new ApiError(400, "No Job Found for given job_id");
  }

  if(experience.trim()===''){
    throw new ApiError(400, "Experience is Required!!");
  }

  const resume_local_path= req.files?.resume[0]?.path;
  if(!resume_local_path){
    throw new ApiError(400, "Not Found Resume Local Path");
  }

  const resumeInstance= await uploadOnCloudinary(resume_local_path, "raw");

  if(!resumeInstance){
    throw new ApiError(400, "Something went worng in uploding resume on Clodinary!!");
  }

  const newApplyer= await AppliedData.create({
    applied_by,
    resume: resumeInstance?.url,
    experience,
    job_id
  });

  if(!newApplyer){
    throw new ApiError(400, "Something went wrong in uploading data!!")
  }

  isJobExists.applyed_details.push(newApplyer._id);
  isJobExists.save();

  return res.status(200).json(new ApiResponse(201, isJobExists, "Applied to Job successfully!!"));
})



export { addJob, getJobById, applyToAJob };
