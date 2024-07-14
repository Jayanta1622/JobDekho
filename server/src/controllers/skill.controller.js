import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Skill } from "../models/skill.model.js";

const addSkill = asyncHandler(async (req, res) => {
    const {skill_name, skill_description}=req.body;
    const added_by=req.user._id;

    if(skill_name.trim()==""){
      throw new ApiError(400, "Skill Name is required!!");
    }

    const new_skill= await Skill.create({
      added_by,
      skill_name,
      skill_description
    })

    if(!new_skill){
      throw new ApiError(400, "Something went worng in adding new skill!!");
    }

    return res.status(201).json(new ApiResponse(200, new_skill, "Skill added Successfully!!"));
});
export { addSkill };
