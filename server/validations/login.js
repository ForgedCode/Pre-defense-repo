import Validator from "validator";
import isEmpty from "is-empty";

export default function validateLoginInput(data) {
	let errors = {};
	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";

	if (Validator.isEmpty(data.email)) {
		errors.emailRU = "Введите Email";
		errors.emailEN = "Email field is empty";
	} else if (!Validator.isEmail(data.email)) {
		errors.emailRU = "Некорректный Email";
		errors.emailEN = "Type correct Email address";
	}
	if (Validator.isEmpty(data.password)) {
		errors.passwordRU = "Введите пароль";
		errors.passwordEN = "Password field is empty";
	}
	return {
		errors,
		isValid: isEmpty(errors),
	};
}
