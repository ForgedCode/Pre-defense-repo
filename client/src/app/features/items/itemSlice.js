import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "../../../axios/apiCall";
import routes from "../../../constants/routes";

const initialState = {
	specificItem: {},
	collectionItems: [],
	queryItems: [],
	latestItems: [],
	isLoading: false,
	messages: {},
};

export const createItem = createAsyncThunk(
	"item/create",
	async ({ itemData, navigate, params }, { rejectWithValue }) => {
		try {
			const res = await apiCall.post(
				`/collection/${params.id}/createItem`,
				itemData
			);
			navigate(-1);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response);
		}
	}
);

export const getCollItems = createAsyncThunk(
	"item/getCollItems",
	async ({ params }, { rejectWithValue }) => {
		try {
			const res = await apiCall.get(`/collection/${params.id}/getCollItems`);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response);
		}
	}
);

export const getCollItem = createAsyncThunk(
	"item/getCollItem",
	async ({ params }, { rejectWithValue }) => {
		try {
			const res = await apiCall.get(`/collection/getCollItem/${params.id}`);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response);
		}
	}
);

export const getLatestItems = createAsyncThunk(
	"item/getLatestItems",
	async (thunkAPI, { rejectWithValue }) => {
		try {
			const res = await apiCall.get("/collection/getLatestItems");
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response);
		}
	}
);

export const editCollItem = createAsyncThunk(
	"item/editCollItem",
	async ({ params, oldData, navigate }, { rejectWithValue }) => {
		try {
			const res = await apiCall.put(
				`/collection/editCollItem/${params.id}`,
				oldData
			);
			navigate(-1);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response);
		}
	}
);

export const deleteCollItem = createAsyncThunk(
	"item/deleteCollItem",
	async ({ params, selectedItem }, { rejectWithValue }) => {
		try {
			const res = await apiCall.delete(
				`/collection/${params.id}/deleteCollItem`,
				{ data: { selectedItem } }
			);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response);
		}
	}
);

export const likeItem = createAsyncThunk(
	"item/likeItem",
	async ({ params }, { rejectWithValue }) => {
		try {
			const res = await apiCall.put(`/collection/likeItem/${params.id}`);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response);
		}
	}
);

export const getQueryItems = createAsyncThunk(
	"item/query",
	async ({ queryItem, navigate }, { rejectWithValue }) => {
		try {
			const res = await apiCall.get("/collection/queryItem", {
				params: { queryItem },
			});
			navigate(routes.SEARCH_RESULTS);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response);
		}
	}
);

export const addStringField = createAsyncThunk(
	"item/addString",
	async ({ params, title }, { rejectWithValue }) => {
		try {
			const res = await apiCall.post(
				`/collection/addStringField/${params.id}`,
				{ title }
			);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response);
		}
	}
);

const itemSlice = createSlice({
	name: "item",
	initialState,
	reducers: {
		clearMessages(state) {
			state.messages = {};
		},
	},
	extraReducers: {
		[createItem.pending]: (state) => {
			state.isLoading = true;
		},
		[createItem.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload;
		},
		[createItem.rejected]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload.data;
		},
		[getCollItems.pending]: (state) => {
			state.isLoading = true;
		},
		[getCollItems.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.collectionItems = action.payload;
		},
		[getCollItems.rejected]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload.data;
		},
		[getCollItem.pending]: (state) => {
			state.isLoading = true;
		},
		[getCollItem.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.specificItem = action.payload;
		},
		[getCollItem.rejected]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload.data;
		},
		[getLatestItems.pending]: (state) => {
			state.isLoading = true;
		},
		[getLatestItems.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.latestItems = action.payload;
		},
		[getLatestItems.rejected]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload.data;
		},
		[editCollItem.pending]: (state) => {
			state.isLoading = true;
		},
		[editCollItem.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload;
		},
		[editCollItem.rejected]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload.data;
		},
		[deleteCollItem.pending]: (state) => {
			state.isLoading = true;
		},
		[deleteCollItem.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload;
		},
		[deleteCollItem.rejected]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload.data;
		},
		[likeItem.pending]: (state) => {
			state.isLoading = true;
		},
		[likeItem.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload;
		},
		[likeItem.rejected]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload.data;
		},
		[getQueryItems.pending]: (state) => {
			state.isLoading = true;
		},
		[getQueryItems.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.queryItems = action.payload;
		},
		[getQueryItems.rejected]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload.data;
		},
		[addStringField.pending]: (state) => {
			state.isLoading = true;
		},
		[addStringField.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload;
		},
		[addStringField.rejected]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload.data;
		},
	},
});

export const { clearMessages } = itemSlice.actions;
export default itemSlice.reducer;
