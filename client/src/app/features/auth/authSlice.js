import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "../../../axios/apiCall";
import localStorageKeys from "../../../constants/localStorageKeys";
import routes from "../../../constants/routes";

const initialState = {
	user: null,
	token: null,
	messages: {},
	isLoading: false,
	isLogin: false,
};

export const register = createAsyncThunk(
	"auth/register",
	async ({ form, navigate }, { rejectWithValue }) => {
		try {
			const res = await apiCall.post("/users/register", { ...form });
			if (res.data) {
				navigate(routes.LOGIN);
			}
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response);
		}
	}
);

export const login = createAsyncThunk(
	"auth/login",
	async ({ form, navigate }, { rejectWithValue }) => {
		try {
			const res = await apiCall.post("/users/login", { ...form });
			if (res.data.token) {
				localStorage.setItem(
					localStorageKeys.TOKEN,
					JSON.stringify(res.data.token)
				);
				localStorage.setItem(
					localStorageKeys.USER,
					JSON.stringify(res.data.user)
				);
			}
			navigate(routes.HOME);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response);
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		clearMessages(state) {
			state.messages = {};
		},
		logout(state) {
			state.user = null;
			state.token = null;
			state.messages = {};
			state.isLoading = false;
			state.isLogin = false;
			localStorage.removeItem(localStorageKeys.TOKEN);
			localStorage.removeItem(localStorageKeys.USER);
		},
		stayLoggedIn(state, action) {
			state.user = action.payload.currentUser;
			state.token = action.payload.token;
			state.isLogin = true;
		},
	},
	extraReducers: {
		[register.pending]: (state) => {
			state.isLoading = true;
			state.messages = {};
		},
		[register.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload;
		},
		[register.rejected]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload.data;
		},
		[login.pending]: (state) => {
			state.isLoading = true;
			state.messages = {};
		},
		[login.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload;
			state.user = action.payload.user;
			state.token = action.payload.token;
			if (action.payload.token) {
				state.isLogin = true;
			}
		},
		[login.rejected]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload.data;
		},
	},
});

export const { clearMessages, stayLoggedIn, logout } = authSlice.actions;

export default authSlice.reducer;
