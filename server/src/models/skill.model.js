import mongoose, { Schema } from "mongoose";

const skillSchema = new Schema(
  {
    added_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    skill_name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    skill_description:{
        type:String
    }
  },
  {
    timestamps: true,
  }
);

export const Skill= mongoose.model("Skill",skillSchema);
