import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validateRegisterInput from "../validations/register.js";
import validateLoginInput from "../validations/login.js";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
	try {
		const { errors, isValid } = validateRegisterInput(req.body);
		const { username, email, password } = req.body;
		if (!isValid) {
			return res.status(400).json(errors);
		}

		const isEmailExists = await User.findOne({ email });
		const isUsernameExists = await User.findOne({ username });
		if (isEmailExists) {
			return res.status(400).json({
				messageRU: "Такой Email адрес уже занят",
				messageEN: "This Email address is already taken",
			});
		} else if (isUsernameExists) {
			return res.status(400).json({
				messageRU: "Такое имя пользователя уже занято",
				messageEN: "This username is already taken",
			});
		}

		const hashPass = bcrypt.hashSync(password, 10);
		const newUser = new User({
			username,
			email,
			password: hashPass,
		});
		await newUser.save();
		return res.status(201).json({
			messageRU: "Пользователь успешно зарегистрирован",
			messageEN: "Account has been registered",
		});
	} catch (err) {
		return res.status(400).json({
			messageRU: "Произошла ошибка, попробуйте снова",
			messageEN: "Something went wrong, try again",
		});
	}
};

export const login = async (req, res) => {
	try {
		const { errors, isValid } = validateLoginInput(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({
				messageRU: "Пользователь с таким Email не найден",
				messageEN: "There is no user with given Email address",
			});
		}
		if (user.isBlocked) {
			return res.status(400).json({
				messageRU: "Пользователь заблокирован",
				messageEN: "User is blocked",
			});
		}
		const isPassMatch = bcrypt.compareSync(password, user.password);
		if (!isPassMatch) {
			return res.status(400).json({
				messageRU: "Неверный пароль",
				messageEN: "Wrong password",
			});
		}
		const payload = {
			id: user._id,
			username: user.username,
		};
		const token = jwt.sign(payload, process.env.SECRET_KEY, {
			expiresIn: "24h",
		});
		return res.status(200).json({
			messageRU: "Вы успешно авторизовались",
			messageEN: "You have successfully logged in",
			token,
			user,
		});
	} catch (err) {
		return res.status(400).json({
			messageRU: "Произошла ошибка, попробуйте снова",
			messageEN: "Something went wrong, try again",
		});
	}
};

export const getUserData = async (req, res) => {
	const data = await User.find();
	return res.json(data);
};

export const deleteUsers = async (req, res) => {
	try {
		const { id } = req.body;
		if (id.length <= 0) {
			return res
				.status(400)
				.json({ messageRU: "Выберите пользователя", messageEN: "Select user" });
		}
		await User.deleteMany({ _id: { $in: id } });
		return res.status(200).json({
			messageRU: "Выбранные пользователи удалены",
			messageEN: "The selected users have been deleted",
		});
	} catch (err) {
		return res.status(400).json({
			messageRU: "Произошла ошибка, попробуйте снова",
			messageEN: "Something went wrong, try again",
		});
	}
};

export const blockUsers = async (req, res) => {
	try {
		const { id } = req.body;
		if (id.length <= 0) {
			return res
				.status(400)
				.json({ messageRU: "Выберите пользователя", messageEN: "Select user" });
		}
		await User.updateMany({ _id: id }, { $set: { isBlocked: true } });
		return res.status(200).json({
			messageRU: "Выбранные пользователи заблокированы",
			messageEN: "The selected users have been blocked",
		});
	} catch (err) {
		return res.status(400).json({
			messageRU: "Произошла ошибка, попробуйте снова",
			messageEN: "Something went wrong, try again",
		});
	}
};

export const unblockUsers = async (req, res) => {
	try {
		const { id } = req.body;
		if (id.length <= 0) {
			return res
				.status(400)
				.json({ messageRU: "Выберите пользователя", messageEN: "Select user" });
		}
		await User.updateMany({ _id: id }, { $set: { isBlocked: false } });
		return res.status(200).json({
			messageRU: "Выбранные пользователи разблокированы",
			messageEN: "The selected users have been unblocked",
		});
	} catch (err) {
		return res.status(400).json({
			messageRU: "Произошла ошибка, попробуйте снова",
			messageEN: "Something went wrong, try again",
		});
	}
};

export const makeAdmin = async (req, res) => {
	try {
		const { id } = req.body;
		if (id.length <= 0) {
			return res
				.status(400)
				.json({ messageRU: "Выберите пользователя", messageEN: "Select user" });
		}
		await User.updateMany({ _id: id }, { $set: { isAdmin: true } });
		return res.status(200).json({
			messageRU: "Выбранные пользователи получили права админа",
			messageEN: "The selected users have been granted admin rights",
		});
	} catch (err) {
		return res.status(400).json({
			messageRU: "Произошла ошибка, попробуйте снова",
			messageEN: "Something went wrong, try again",
		});
	}
};

export const makeUser = async (req, res) => {
	try {
		const { id } = req.body;
		if (id.length <= 0) {
			return res
				.status(400)
				.json({ messageRU: "Выберите пользователя", messageEN: "Select user" });
		}
		await User.updateMany({ _id: id }, { $set: { isAdmin: false } });
		return res.status(200).json({
			messageRU: "Права админа изъяты у выбранных пользователей",
			messageEN: "Admin rights removed from the selected users",
		});
	} catch (err) {
		return res.status(400).json({
			messageRU: "Произошла ошибка, попробуйте снова",
			messageEN: "Something went wrong, try again",
		});
	}
};
