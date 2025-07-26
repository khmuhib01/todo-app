import {useEffect, useState} from 'react';

const useDarkMode = () => {
	const [isDark, setIsDark] = useState(() => {
		return (
			localStorage.getItem('theme') === 'dark' ||
			(window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'))
		);
	});

	useEffect(() => {
		const root = window.document.documentElement;

		if (isDark) {
			root.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			root.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}, [isDark]);

	return [isDark, setIsDark];
};

export default useDarkMode;
