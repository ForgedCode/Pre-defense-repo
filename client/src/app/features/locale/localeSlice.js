import { createSlice } from "@reduxjs/toolkit";
import localStorageKeys from "../../../constants/localStorageKeys";
import locales from "../../../localization/locales";
import ruMessages from "../../../localization/ru.json";
import enMessages from "../../../localization/en.json";

const messages = {
	[locales.EN]: enMessages,
	[locales.RU]: ruMessages,
};

const initialState = {
	messages: messages,
	currentLocale: localStorage.getItem(localStorageKeys.LOCALE) || locales.EN,
};

const localeSLice = createSlice({
	name: "locale",
	initialState,
	reducers: {
		changeLocale(state, action) {
			state.currentLocale = action.payload;
			localStorage.setItem(localStorageKeys.LOCALE, action.payload);
		},
	},
});

export const { changeLocale } = localeSLice.actions;

export default localeSLice.reducer;
