/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#1A1A1B",
				secondary: "#E9BB19",
			},
			fontFamily: {
				serif: ["serif"],
			},
			fontSize: {
				"2xl": "12.5rem",
			},
		},
	},
	plugins: [],
};
