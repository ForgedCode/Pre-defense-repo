import { Router } from "express";
import {
	register,
	login,
	getUserData,
	blockUsers,
	unblockUsers,
	makeAdmin,
	makeUser,
	deleteUsers,
} from "../controllers/users.js";
import checkIsAdmin from "../middlewares/checkIsAdmin.js";
import checkIsAuth from "../middlewares/checkIsAuth.js";
const router = new Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", checkIsAuth, checkIsAdmin, getUserData);
router.put("/block", checkIsAuth, checkIsAdmin, blockUsers);
router.put("/unblock", checkIsAuth, checkIsAdmin, unblockUsers);
router.put("/makeAdmin", checkIsAuth, checkIsAdmin, makeAdmin);
router.put("/makeUser", checkIsAuth, checkIsAdmin, makeUser);
router.delete("/delete", checkIsAuth, checkIsAdmin, deleteUsers);

export default router;
