import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import collectionSlice from "./features/collection/collectionSlice";
import commentSlice from "./features/comments/commentSlice";
import itemSlice from "./features/items/itemSlice";
import localeSlice from "./features/locale/localeSlice";
import tagSlice from "./features/tags/tagSlice";
import userControlSlice from "./features/userControl/userControlSlice";

export const store = configureStore({
	reducer: {
		locale: localeSlice,
		auth: authSlice,
		userControl: userControlSlice,
		collection: collectionSlice,
		item: itemSlice,
		tag: tagSlice,
		comment: commentSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
