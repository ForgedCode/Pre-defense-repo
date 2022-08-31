import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const itemSchema = new Schema(
	{
		itemId: { type: String, required: true },
		title: { type: String, required: true },
		tags: [{ type: String }],
		creator: { type: String },
		collName: { type: String },
		toCollection: { type: Types.ObjectId, ref: "Collection" },
		likes: { type: Array, default: [] },
		comments: [{ type: Types.ObjectId, ref: "Comment" }],
		customString: [
			{ title: { type: String, max: 30 }, body: { type: String, max: 30 } },
		],
		customText: [{ title: { type: String, max: 30 }, body: String }],
		customNumber: [{ title: { type: String, max: 30 }, body: Number }],
		customDate: [{ title: { type: String, max: 30 }, body: Date }],
		customBoolean: [{ title: { type: String, max: 30 }, body: Boolean }],
	},
	{ timestamps: true }
);

export default model("Item", itemSchema);
