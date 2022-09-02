import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import bodyParser from "body-parser";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import tagRoutes from "./routes/tagRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
dotenv.config();

const app = express();
const upload = multer();
const port = process.env.PORT || 5000;

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(upload.array());
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("common"));

const connector = async () => {
	await mongoose.connect(
		process.env.MONGO_URI,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
		() => console.log("Соединение с БД установлено")
	);
};
connector();

app.use("/api/users", userRoutes);
app.use("/api/collection", collectionRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/comments", commentRoutes);
app.listen(port, () => console.log(`App is running on port: ${port}`));
