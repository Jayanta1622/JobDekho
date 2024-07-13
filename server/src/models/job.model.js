import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema(
  {
    added_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    job_title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    job_description: {
      type: String,
      required: true,
    },
    required_skills: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
    required_experience:{
        type:String,
        required:true
    }
  },
  {
    timestamps: true,
  }
);

export const Job= mongoose.model("Job",jobSchema);
