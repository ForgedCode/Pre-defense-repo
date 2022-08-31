import Comment from "../models/Comment.js";
import Item from "../models/CollectionItem.js";

export const addComment = async (req, res) => {
	try {
		const newComment = new Comment({
			comment: req.body.comment,
			commentBy: req.user.username,
			author: req.user.id,
		});
		await newComment.save();
		await Item.findByIdAndUpdate(req.params.id, {
			$push: { comments: newComment },
		});
		return res.status(200).json({
			messageRU: "Вы добавили комментарий",
			messageEN: "You have added comment",
		});
	} catch (err) {
		return res.status(400).json({
			messageRU: "Произошла ошибка, попробуйте снова",
			messageEN: "Something went wrong, try again",
		});
	}
};

export const getItemComments = async (req, res) => {
	try {
		const item = await Item.findById(req.params.id);
		if (!item) {
			return res.status(400).json({
				messageRU: "Такой предмет не найден",
				messageEN: "There is no such item",
			});
		}
		const comments = await Promise.all(
			item.comments.map((comment) => {
				return Comment.findById(comment._id);
			})
		);
		if (!comments) {
			return res.status(400).json({
				messageRU: "Ошибка, нету комментариев для предмета",
				messageEN: "Error, no comments for this item",
			});
		}
		return res.status(200).json(comments);
	} catch (err) {
		return res.status(400).json({
			messageRU: "Произошла ошибка, попробуйте снова",
			messageEN: "Something went wrong, try again",
		});
	}
};
