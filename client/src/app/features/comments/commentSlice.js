import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "../../../axios/apiCall";

const initialState = {
	comments: [],
	isLoading: false,
	messages: {},
};

export const addComment = createAsyncThunk(
	"comment/add",
	async ({ comment, params }, { rejectWithValue }) => {
		try {
			const res = await apiCall.post(`/comments/add/${params.id}`, { comment });
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response);
		}
	}
);

export const getItemComments = createAsyncThunk(
	"comment/get",
	async ({ params }, { rejectWithValue }) => {
		try {
			const res = await apiCall.get(`/comments/get/${params.id}`);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response);
		}
	}
);

const commentSlice = createSlice({
	name: "comment",
	initialState,
	reducers: {
		clearMessages(state) {
			state.messages = {};
		},
	},
	extraReducers: {
		[addComment.pending]: (state) => {
			state.isLoading = true;
		},
		[addComment.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload;
		},
		[addComment.rejected]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload.data;
		},
		[getItemComments.pending]: (state) => {
			state.isLoading = true;
		},
		[getItemComments.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.comments = action.payload;
		},
		[getItemComments.rejected]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload.data;
		},
	},
});

export const { clearMessages } = commentSlice.actions;
export default commentSlice.reducer;
