import mongoose from "mongoose";
const { Schema, model } = mongoose;

const tagSchema = new Schema(
	{
		tag: { type: String, required: true, unique: true },
	},
	{ timestamps: true }
);

export default model("Tag", tagSchema);
