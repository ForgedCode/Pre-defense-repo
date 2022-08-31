import axios from "axios";
import localStorageKeys from "../constants/localStorageKeys";
import urls from "../constants/urls";

const apiCall = axios.create({
	baseURL: urls.BASE_URL,
});

apiCall.interceptors.request.use((req) => {
	if (localStorage.getItem(localStorageKeys.TOKEN)) {
		req.headers.Authorization = `Bearer ${JSON.parse(
			localStorage.getItem(localStorageKeys.TOKEN)
		)}`;
	}
	return req;
});

export default apiCall;
