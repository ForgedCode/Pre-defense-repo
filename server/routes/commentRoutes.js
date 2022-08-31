import { Router } from "express";
import { addComment, getItemComments } from "../controllers/comments.js";
import checkIsAuth from "../middlewares/checkIsAuth.js";
const router = new Router();

router.post("/add/:id", checkIsAuth, addComment);
router.get("/get/:id", getItemComments);

export default router;
