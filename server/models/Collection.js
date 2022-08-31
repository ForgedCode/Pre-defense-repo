import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const collectionSchema = new Schema(
	{
		title: { type: String, required: true },
		creator: { type: String },
		description: { type: String, require: true },
		topic: { type: String, required: true },
		imgUrl: { type: String, default: "" },
		author: { type: Types.ObjectId, ref: "User" },
		collectionItems: [{ type: Types.ObjectId, ref: "Item" }],
	},
	{ timestamps: true }
);

export default model("Collection", collectionSchema);
