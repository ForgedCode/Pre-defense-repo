/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				dark: "#18191C",
				light: "#F6F6F7",
				lightModal: "#8b8b9e",
				lightLink: "#0084FF",
				darkLink: "#73BCFF",
				darkModal: "#2D2D30",
			},
		},
	},
	plugins: [require("@tailwindcss/line-clamp")],
};
