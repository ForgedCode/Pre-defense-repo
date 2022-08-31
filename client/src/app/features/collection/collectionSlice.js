import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "../../../axios/apiCall";
import routes from "../../../constants/routes";

const initialState = {
	personalColl: [],
	specificColl: {},
	biggestColls: [],
	isLoading: false,
	messages: {},
};

export const createCollection = createAsyncThunk(
	"collection/create",
	async ({ collData, navigate }, { rejectWithValue }) => {
		try {
			const res = await apiCall.post("/collection/createCollection", collData);
			navigate(routes.MYCOLLS);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response);
		}
	}
);

export const getPersonalColl = createAsyncThunk(
	"collection/getPersonalColl",
	async (thunkAPI, { rejectWithValue }) => {
		try {
			const res = await apiCall.get("/collection/getPersonalColl");
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response);
		}
	}
);

export const getCollById = createAsyncThunk(
	"collection/getCollById",
	async (params, { rejectWithValue }) => {
		try {
			const res = await apiCall.get(`/collection/${params.id}`);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response);
		}
	}
);

export const getBiggestColls = createAsyncThunk(
	"collection/getBiggestColls",
	async (thunkAPI, { rejectWithValue }) => {
		try {
			const res = await apiCall.get("/collection/getBiggestColls");
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response);
		}
	}
);

export const updateCollection = createAsyncThunk(
	"collection/update",
	async ({ updCollData, navigate, params }, { rejectWithValue }) => {
		try {
			const res = await apiCall.put(`/collection/${params.id}`, updCollData);
			navigate(-1);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response);
		}
	}
);

export const deleteCollection = createAsyncThunk(
	"collection/delete",
	async ({ params, navigate }, { rejectWithValue }) => {
		try {
			const res = await apiCall.delete(`/collection/${params.id}`, params.id);
			navigate(-1);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response);
		}
	}
);

const collectionSlice = createSlice({
	name: "collection",
	initialState,
	reducers: {
		clearMessages(state) {
			state.messages = {};
		},
	},
	extraReducers: {
		[createCollection.pending]: (state) => {
			state.isLoading = true;
		},
		[createCollection.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload;
		},
		[createCollection.rejected]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload.data;
		},
		[getPersonalColl.pending]: (state) => {
			state.isLoading = true;
		},
		[getPersonalColl.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.personalColl = action.payload;
		},
		[getPersonalColl.rejected]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload.data;
		},
		[getCollById.pending]: (state) => {
			state.isLoading = true;
		},
		[getCollById.fulfilled]: (state, action) => {
			state.specificColl = action.payload;
			state.isLoading = false;
		},
		[getCollById.rejected]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload.data;
		},
		[getBiggestColls.pending]: (state) => {
			state.isLoading = true;
		},
		[getBiggestColls.fulfilled]: (state, action) => {
			state.biggestColls = action.payload;
			state.isLoading = false;
		},
		[getBiggestColls.rejected]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload.data;
		},
		[updateCollection.pending]: (state) => {
			state.isLoading = true;
		},
		[updateCollection.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload;
		},
		[updateCollection.rejected]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload.data;
		},
		[deleteCollection.pending]: (state) => {
			state.isLoading = true;
		},
		[deleteCollection.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload;
		},
		[deleteCollection.rejected]: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload.data;
		},
	},
});

export const { clearMessages } = collectionSlice.actions;

export default collectionSlice.reducer;
