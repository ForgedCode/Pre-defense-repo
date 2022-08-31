import Validator from "validator";
import isEmpty from "is-empty";

export default function validateRegisterInput(data) {
	let errors = {};
	data.username = !isEmpty(data.username) ? data.username : "";
	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";
	data.checkPass = !isEmpty(data.checkPass) ? data.checkPass : "";

	if (Validator.isEmpty(data.username)) {
		errors.usernameRU = `Необходимо заполнить поле "Имя пользователя"`;
		errors.usernameEN = `Username field is empty`;
	}
	if (Validator.isEmpty(data.email)) {
		errors.emailRU = `Необходимо заполнить поле "E-mail"`;
		errors.emailEN = `Email address field is empty`;
	} else if (!Validator.isEmail(data.email)) {
		errors.emailRU = "Введите корректный Email адрес";
		errors.emailEN = "Type correct Email address";
	}
	if (Validator.isEmpty(data.password)) {
		errors.passwordRU = "Необходимо ввести пароль";
		errors.passwordEN = "Password field is empty";
	}
	if (Validator.isEmpty(data.checkPass)) {
		errors.checkPassRU = "Подтвердите пароль";
		errors.checkPassEN = "Confirm password";
	}
	if (!Validator.isLength(data.password, { min: 1, max: 30 })) {
		errors.passwordRU = "Пароль должен содержать хотя бы 1 символ";
		errors.passwordEN = "Password must have at least 1 symbol";
	}
	if (!Validator.equals(data.password, data.checkPass)) {
		errors.checkPassRU = "Пароли должны совпадать";
		errors.checkPassEN = "Passwords do not match";
	}
	return {
		errors,
		isValid: isEmpty(errors),
	};
}
