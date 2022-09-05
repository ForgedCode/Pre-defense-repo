import Collection from "../models/Collection.js";
import Item from "../models/CollectionItem.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";
import cloudinary from "../cloudinary/cloudinary.js";

export const createCollection = async (req, res) => {
	try {
		const { title, description, topic, imgPath } = req.body;
		if (imgPath) {
			const uploadedImg = await cloudinary.uploader.upload(req.body.imgPath, {
				folder: "collection images",
			});
			const imgColl = new Collection({
				title,
				creator: req.user.username,
				description,
				topic,
				imgUrl: uploadedImg.secure_url,
				author: req.user.id,
			});
			await imgColl.save();
			await User.findByIdAndUpdate(req.user.id, {
				$push: { collections: imgColl },
			});
			return res.status(200).json({
				messageRU: "Коллекция успешно создана",
				messageEN: "Collection is successfully created",
			});
		}
		const noImgColl = new Collection({
			title,
			creator: req.user.username,
			description,
			topic,
			imgUrl: "",
			author: req.user.id,
		});
		await noImgColl.save();
		await User.findByIdAndUpdate(req.user.id, {
			$push: { collections: noImgColl },
		});
		return res.status(200).json({
			messageRU: "Коллекция успешно создана",
			messageEN: "Collection is successfully created",
		});
	} catch (err) {
		return res.status(400).json({
			messageRU: "Произошла ошибка, попробуйте снова",
			messageEN: "Something went wrong, try again",
		});
	}
};

export const getPersonalColl = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		const collection = await Promise.all(
			user.collections.map((coll) => {
				return Collection.findById(coll._id);
			})
		);
		return res.status(200).json(collection);
	} catch (err) {
		return res.status(400).json({
			messageRU: "Произошла ошибка, попробуйте снова",
			messageEN: "Something went wrong, try again",
		});
	}
};

export const getCollById = async (req, res) => {
	try {
		const collection = await Collection.findById(req.params.id);
		if (!collection) {
			return res.status(400).json({
				messageRU: "Такой коллекции не существует",
				messageEN: "There is no such collection",
			});
		}
		return res.status(200).json(collection);
	} catch (err) {
		return res.status(400).json({
			messageRU: "Произошла ошибка, попробуйте снова",
			messageEN: "Something went wrong, try again",
		});
	}
};

export const getBiggestColls = async (req, res) => {
	try {
		const bigColls = await Collection.find().sort("-collectionItems").limit(5);
		if (!bigColls) {
			return res.status(400).json({
				messageRU: "Нету коллекций",
				messageEN: "No collections",
			});
		}
		return res.status(200).json(bigColls);
	} catch (err) {
		return res.status(400).json({
			messageRU: "Произошла ошибка, попробуйте снова",
			messageEN: "Something went wrong, try again",
		});
	}
};

export const editCollById = async (req, res) => {
	try {
		const { title, description, topic, imgPath } = req.body;
		if (imgPath) {
			const uploadedImg = await cloudinary.uploader.upload(imgPath, {
				folder: "collection images",
			});
			await Collection.findByIdAndUpdate(req.params.id, {
				$set: { title, description, topic, imgUrl: uploadedImg.secure_url },
			});
			return res.status(200).json({
				messageRU: "Коллекция успешно отредактирована",
				messageEN: "The collection has been updated",
			});
		} else {
			await Collection.findByIdAndUpdate(req.params.id, {
				$set: { title, description, topic },
			});
			return res.status(200).json({
				messageRU: "Коллекция успешно отредактирована",
				messageEN: "The collection has been updated",
			});
		}
	} catch (err) {
		return res.status(400).json({
			messageRU: "Произошла ошибка, попробуйте снова",
			messageEN: "Something went wrong, try again",
		});
	}
};

export const deleteCollById = async (req, res) => {
	try {
		const collection = await Collection.findById(req.params.id);
		if (!collection)
			return res.status(400).json({
				messageRU: "Такой коллекции не существует",
				messageEN: "There is no such collection",
			});
		await Promise.all(
			collection.collectionItems.map(async (item) => {
				const targetItem = await Item.findById(item._id);
				await Promise.all(
					targetItem.comments.map((i) => {
						return Comment.findByIdAndDelete(i._id);
					})
				);
				return Item.findByIdAndDelete(item._id);
			})
		);
		await User.findByIdAndUpdate(collection.author, {
			$pull: { collections: req.params.id },
		});
		await collection.deleteOne();
		return res.status(200).json({
			messageRU: "Коллекция успешно удалена",
			messageEN: "You have succesfully deleted the collection",
		});
	} catch (err) {
		return res.status(400).json({
			messageRU: "Произошла ошибка, попробуйте снова",
			messageEN: "Something went wrong, try again",
		});
	}
};
