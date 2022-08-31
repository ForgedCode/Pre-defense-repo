import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const commentSchema = new Schema(
	{
		comment: { type: String, required: true },
		commentBy: { type: String },
		author: { type: Types.ObjectId, ref: "User" },
	},
	{ timestamps: true }
);

export default model("Comment", commentSchema);
