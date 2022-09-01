import { Router } from "express";
import { getItemsByTag } from "../controllers/items.js";
import { getTags } from "../controllers/tags.js";
const router = new Router();

router.get("/getTags", getTags);
router.get("/getByTag", getItemsByTag);

export default router;
