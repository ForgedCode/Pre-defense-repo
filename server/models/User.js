import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const userSchema = new Schema(
	{
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		isAdmin: { type: Boolean, default: false },
		isBlocked: { type: Boolean, default: false },
		collections: [{ type: Types.ObjectId, ref: "Collection" }],
	},
	{ timestamps: true }
);

export default model("User", userSchema);
