import Tag from "../models/Tag.js";

export const getTags = async (req, res) => {
	try {
		const tags = await Tag.find();
		return res.status(200).json(tags);
	} catch (err) {
		return res.status(400).json({
			messageRU: "Произошла ошибка, попробуйте снова",
			messageEN: "Something went wrong, try again",
		});
	}
};
