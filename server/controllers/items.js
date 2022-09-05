import Collection from "../models/Collection.js";
import Item from "../models/CollectionItem.js";
import Comment from "../models/Comment.js";
import Tag from "../models/Tag.js";

export const createItem = async (req, res) => {
	try {
		const { id, title, selectedTags } = req.body;
		const collection = await Collection.findById(req.params.id);
		selectedTags.forEach(async (tag) => {
			const tagExists = await Tag.exists({ tag });
			if (tagExists) {
				return;
			} else {
				const newTag = new Tag({
					tag,
				});
				await newTag.save();
			}
		});
		const newItem = new Item({
			itemId: id,
			creator: req.user.username,
			author: req.user.id,
			collName: collection.title,
			title,
			tags: selectedTags,
			toCollection: req.params.id,
		});
		await newItem.save();
		await Collection.findByIdAndUpdate(req.params.id, {
			$push: { collectionItems: newItem },
		});
		return res.status(200).json({
			messageRU: "Предмет успешно добавлен в коллекцию",
			messageEN: "Item has been added to the collection",
		});
	} catch (err) {
		return res.status(400).json({
			messageRU: "Произошла ошибка, попробуйте снова",
			messageEN: "Something went wrong, try again",
		});
	}
};

export const getCollItems = async (req, res) => {
	try {
		const collection = await Collection.findById(req.params.id);
		const items = await Promise.all(
			collection.collectionItems.map((item) => {
				return Item.findById(item._id);
			})
		);
		if (!items) {
			return res.status(404);
		}
		return res.status(200).json(items);
	} catch (err) {
		return res.status(400).json({
			messageRU: "Произошла ошибка, попробуйте снова",
			messageEN: "Something went wrong, try again",
		});
	}
};

export const getLatestItems = async (req, res) => {
	try {
		const latestItems = await Item.find().sort("-createdAt").limit(10);
		if (!latestItems) {
			return res.status(400).json({
				messageRU: "Предметов не найдено",
				messageEN: "There are no items",
			});
		}
		return res.status(200).json(latestItems);
	} catch (err) {
		return res.status(400).json({
			messageRU: "Произошла ошибка, попробуйте снова",
			messageEN: "Something went wrong, try again",
		});
	}
};

export const deleteCollItem = async (req, res) => {
	try {
		const item = await Item.findById(req.body.selectedItem);
		if (!item) {
			return res.status(400).json({
				messageRU: "Такого предмета нету в коллекции",
				messageEN: "There is no such item in the collection",
			});
		}
		await Collection.findByIdAndUpdate(req.params.id, {
			$pull: { collectionItems: req.body.selectedItem },
		});
		await Promise.all(
			item.comments.map((i) => {
				return Comment.findByIdAndDelete(i._id);
			})
		);
		await item.deleteOne();
		return res.status(200).json({
			messageRU: "Предмет успешно удален",
			messageEN: "Item has been deleted",
		});
	} catch (err) {
		return res.status(400).json({
			messageRU: "Произошла ошибка, попробуйте снова",
			messageEN: "Something went wrong, try again",
		});
	}
};

export const getCollItem = async (req, res) => {
	try {
		const item = await Item.findById(req.params.id);
		if (!item) {
			return res.status(400).json({
				messageRU: "Такой предмет не найден",
				messageEN: "There is no such item",
			});
		}
		return res.status(200).json(item);
	} catch (err) {
		return res.status(400).json({
			messageRU: "Произошла ошибка, попробуйте снова",
			messageEN: "Something went wrong, try again",
		});
	}
};

export const editCollItem = async (req, res) => {
	try {
		const { id, title, selectedTags } = req.body;
		await Item.findByIdAndUpdate(req.params.id, {
			$set: { itemId: id, title, tags: selectedTags },
		});
		return res.status(200).json({
			messageRU: "Предмет успешно отредактирован",
			messageEN: "The item has been updated",
		});
	} catch (err) {
		return res.status(400).json({
			messageRU: "Произошла ошибка, попробуйте снова",
			messageEN: "Something went wrong, try again",
		});
	}
};

export const likeCollItem = async (req, res) => {
	try {
		const item = await Item.findById(req.params.id);
		const likeFrom = req.user.id;
		if (item.likes.includes(likeFrom)) {
			await item.updateOne({ $pull: { likes: likeFrom } });
			return res.status(200).json({
				messageRU: "Вы убрали лайк",
				messageEN: "Item unliked",
			});
		} else {
			await item.updateOne({ $push: { likes: likeFrom } });
			return res.status(200).json({
				messageRU: "Вы поставили лайк",
				messageEN: "Item liked",
			});
		}
	} catch (err) {
		return res.status(400).json({
			messageRU: "Произошла ошибка, попробуйте снова",
			messageEN: "Something went wrong, try again",
		});
	}
};

export const getItemsByTag = async (req, res) => {
	try {
		const { tag } = req.query;
		const itemsByTag = await Item.find({ tags: { $in: tag } });
		if (!itemsByTag) {
			return res.status(404);
		}
		return res.status(200).json({ itemsByTag, tag, count: itemsByTag.length });
	} catch (err) {
		return res.status(400).json({
			messageRU: "Произошла ошибка, попробуйте снова",
			messageEN: "Something went wrong, try again",
		});
	}
};

export const getQueryItems = async (req, res) => {
	try {
		const { queryItem } = req.query;
		const queryResults = await Item.find({
			$text: { $search: queryItem },
		});
		if (!queryResults) {
			return res.status(404);
		}
		return res
			.status(200)
			.json({ queryResults, count: queryResults.length, queryItem });
	} catch (err) {
		return res.status(400).json({
			messageRU: "Произошла ошибка, попробуйте снова",
			messageEN: "Something went wrong, try again",
		});
	}
};

export const addStringField = async (req, res) => {
	try {
		const { id: collId } = req.params;
		const { title } = req.body;
		const collItems = await Item.updateMany(
			{ toCollection: collId },
			{ $push: { customString: { title }, body: null } }
		);
		return res.status(200).json("OK");
	} catch (err) {
		return res.status(400).json({
			messageRU: "Произошла ошибка, попробуйте снова",
			messageEN: "Something went wrong, try again",
		});
	}
};
