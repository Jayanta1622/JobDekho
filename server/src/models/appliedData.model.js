import mongoose, { Schema } from "mongoose";

const appliedDataSchema= new Schema({
    applied_by:{
        type:Schema.Types.ObjectId,
        required:true
    },
    job_id:{
        type:Schema.Types.ObjectId,
        required:true
    },
    resume:{
        type:String,
        requird:true
    },
    experience:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

export const AppliedData= mongoose.model("AppliedData", appliedDataSchema);