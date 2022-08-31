import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "../../../axios/apiCall";

const initialState = {
	userData: [],
	messages: {},
	isLoading: false,
};

export const getUserData = createAsyncThunk(
	"users/getData",
	async (thunkAPI, { rejectWithValue }) => {
		try {
			const res = await apiCall.get("/users");
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response);
		}
	}
);

export const deleteUsers = createAsyncThunk(
	"users/deleteUsers",
	async ({ selectedUsers }, { rejectWithValue }) => {
		try {
			const res = await apiCall.delete("/users/delete", {
				data: { id: selectedUsers },
			});
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response);
		}
	}
);

export const blockUsers = createAsyncThunk(
	"users/blockUsers",
	async ({ selectedUsers }, { rejectWithValue }) => {
		try {
			const res = await apiCall.put("/users/block", { id: selectedUsers });
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response);
		}
	}
);

export const unblockUsers = createAsyncThunk(
	"users/unblockUsers",
	async ({ selectedUsers }, { rejectWithValue }) => {
		try {
			const res = await apiCall.put("/users/unblock", { id: selectedUsers });
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response);
		}
	}
);

export const makeAdmin = createAsyncThunk(
	"users/makeAdmin",
	async ({ selectedUsers }, { rejectWithValue }) => {
		try {
			const res = await apiCall.put("/users/makeAdmin", { id: selectedUsers });
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response);
		}
	}
);

export const makeUser = createAsyncThunk(
	"users/makeUser",
	async ({ selectedUsers }, { rejectWithValue }) => {
		try {
			const res = await apiCall.put("/users/makeUser", { id: selectedUsers });
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response);
		}
	}
);

const userControlSlice = createSlice({
	name: "userControl",
	initialState,
	reducers: {
		clearMessages(state) {
			state.messages = {};
		},
	},
	extraReducers: {
		[getUserData.pending]: (state) => {
			state.isLoading = true;
			state.messages = {};
		},
		[getUserData.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.userData = action.payload;
		},
		[getUserData.rejected]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload.data;
		},
		[deleteUsers.pending]: (state) => {
			state.isLoading = true;
			state.messages = {};
		},
		[deleteUsers.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload;
		},
		[deleteUsers.rejected]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload.data;
		},
		[blockUsers.pending]: (state) => {
			state.isLoading = true;
			state.messages = {};
		},
		[blockUsers.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload;
		},
		[blockUsers.rejected]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload.data;
		},
		[unblockUsers.pending]: (state) => {
			state.isLoading = true;
			state.messages = {};
		},
		[unblockUsers.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload;
		},
		[unblockUsers.rejected]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload.data;
		},
		[makeAdmin.pending]: (state) => {
			state.isLoading = true;
			state.messages = {};
		},
		[makeAdmin.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload;
		},
		[makeAdmin.rejected]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload.data;
		},
		[makeUser.pending]: (state) => {
			state.isLoading = true;
			state.messages = {};
		},
		[makeUser.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload;
		},
		[makeUser.rejected]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload.data;
		},
	},
});

export const { clearMessages } = userControlSlice.actions;

export default userControlSlice.reducer;
