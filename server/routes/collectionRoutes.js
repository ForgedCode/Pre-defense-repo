import { Router } from "express";
import {
	createCollection,
	deleteCollById,
	editCollById,
	getBiggestColls,
	getCollById,
	getPersonalColl,
} from "../controllers/collection.js";
import {
	addStringField,
	createItem,
	deleteCollItem,
	editCollItem,
	getCollItem,
	getCollItems,
	getLatestItems,
	getQueryItems,
	likeCollItem,
} from "../controllers/items.js";
import checkIsAuth from "../middlewares/checkIsAuth.js";
const router = new Router();

router.post("/createCollection", checkIsAuth, createCollection);
router.get("/getPersonalColl", checkIsAuth, getPersonalColl);
router.get("/getLatestItems", getLatestItems);
router.get("/getBiggestColls", getBiggestColls);
router.get("/queryItem", getQueryItems);
router.post("/addStringField/:id", checkIsAuth, addStringField);
router.put("/editCollItem/:id", checkIsAuth, editCollItem);
router.put("/likeItem/:id", checkIsAuth, likeCollItem);
router.get("/getCollItem/:id", getCollItem);
router.get("/:id", getCollById);
router.put("/:id", checkIsAuth, editCollById);
router.delete("/:id", checkIsAuth, deleteCollById);
router.post("/:id/createItem", checkIsAuth, createItem);
router.get("/:id/getCollItems", getCollItems);
router.delete("/:id/deleteCollItem", checkIsAuth, deleteCollItem);

export default router;
