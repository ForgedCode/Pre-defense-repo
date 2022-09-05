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

export const getSampleTags = async (req, res) => {
	try {
		const sampleTags = await Tag.aggregate([{ $sample: { size: 15 } }]);
		return res.status(200).json(sampleTags);
	} catch (err) {
		return res.status(400).json({
			messageRU: "Произошла ошибка, попробуйте снова",
			messageEN: "Something went wrong, try again",
		});
	}
};
