/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#f97316', // orange
					hover: '#ea580c',
					light: '#fdba74',
				},
				secondary: {
					DEFAULT: '#6366f1', // indigo
					dark: '#4f46e5',
				},
				background: {
					light: '#ffffff',
					dark: '#1f2937',
				},
				text: {
					base: '#111827',
					light: '#6b7280',
					white: '#ffffff',
				},
			},
		},
	},
	plugins: [],
};
