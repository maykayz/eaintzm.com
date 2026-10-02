/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "var(--color-primary)",
				secondary: "var(--color-secondary)",
				muted: "var(--color-muted)",
				maroon: "var(--color-maroon)",
				tan: "var(--color-tan)",
				rose: "var(--color-rose)",
				forest: "var(--color-forest)",
				navy: "var(--color-navy)",
			},
			fontFamily: {
				serif: ["serif"],
				pixel: ['"Press Start 2P"', "monospace"],
			},
			fontSize: {
				"2xl": "12.5rem",
			},
		},
	},
	plugins: [],
};
