import { useEffect, useState } from "react";
import localStorageKeys from "../constants/localStorageKeys";

export const useThemeSwitcher = () => {
	const [theme, setTheme] = useState(() => localStorage.theme === "dark");

	const themeSwitcher = () => {
		setTheme(!theme);
	};

	useEffect(() => {
		const html = window.document.documentElement;
		const prevTheme = theme ? "light" : "dark";
		html.classList.remove(prevTheme);
		const nextTheme = theme ? "dark" : "light";
		html.classList.add(nextTheme);
		localStorage.setItem(localStorageKeys.THEME, nextTheme);
	}, [theme]);

	return [theme, themeSwitcher];
};
