import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "../../../axios/apiCall";

const initialState = {
	tags: [],
	isLoading: false,
};

export const getTags = createAsyncThunk(
	"item/getTags",
	async (thunkAPI, { rejectWithValue }) => {
		try {
			const res = await apiCall.get("/tags/getTags");
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response);
		}
	}
);

const tagSlice = createSlice({
	name: "tag",
	initialState,
	reducers: {},
	extraReducers: {
		[getTags.pending]: (state) => {
			state.isLoading = true;
		},
		[getTags.fulfilled]: (state, action) => {
			state.tags = action.payload;
			state.isLoading = false;
		},
		[getTags.rejected]: (state) => {
			state.isLoading = false;
		},
	},
});

export default tagSlice.reducer;
