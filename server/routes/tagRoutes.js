import { Router } from "express";
import { getTags } from "../controllers/tags.js";
import checkIsAuth from "../middlewares/checkIsAuth.js";
const router = new Router();

router.get("/getTags", getTags);

export default router;
