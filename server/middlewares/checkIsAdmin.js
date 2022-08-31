import User from "../models/User.js";

export default async (req, res, next) => {
	if (req.method === "OPTIONS") {
		return next();
	}
	try {
		const isAdmin = await User.findById(req.user.id);
		if (isAdmin.isAdmin) {
			next();
		} else {
			return res.status(403).json({ message: "You are not allowed" });
		}
	} catch (e) {
		return res.status(401).json({ message: "User not authorized!" });
	}
};
