import { Router } from "express";
import { getItemsByTag } from "../controllers/items.js";
import { getSampleTags, getTags } from "../controllers/tags.js";
const router = new Router();

router.get("/getTags", getTags);
router.get("/getByTag", getItemsByTag);
router.get("/getSampleTags", getSampleTags);

export default router;
