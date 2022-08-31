import jwt from "jsonwebtoken";

export default async (req, res, next) => {
	if (req.method === "OPTIONS") {
		return next();
	}
	try {
		const token = await req.headers.authorization.split(" ")[1];
		if (!token) {
			return res.status(401).json({ message: "User not authorized!" });
		}
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		req.user = decoded;
		next();
	} catch (e) {
		return res.status(401).json({ message: "User not authorized!" });
	}
};
