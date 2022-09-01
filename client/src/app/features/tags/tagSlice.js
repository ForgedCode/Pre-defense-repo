import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "../../../axios/apiCall";
import routes from "../../../constants/routes";

const initialState = {
	tags: [],
	itemsByTag: [],
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

export const getItemsByTag = createAsyncThunk(
	"item/getByTag",
	async ({ tag, navigate }, { rejectWithValue }) => {
		try {
			const res = await apiCall.get("/tags/getBytag", { params: { tag } });
			navigate(routes.TAG_RESULTS);
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
		[getItemsByTag.pending]: (state) => {
			state.isLoading = true;
		},
		[getItemsByTag.fulfilled]: (state, action) => {
			state.itemsByTag = action.payload;
			state.isLoading = false;
		},
		[getItemsByTag.rejected]: (state) => {
			state.isLoading = false;
		},
	},
});

export default tagSlice.reducer;
