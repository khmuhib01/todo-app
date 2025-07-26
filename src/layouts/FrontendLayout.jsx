import {Outlet, NavLink} from 'react-router-dom';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import useDarkMode from '../hooks/useDarkMode';
import {FiMenu} from 'react-icons/fi';

const FrontendLayout = () => {
	const {i18n} = useTranslation();
	const [isDark, setIsDark] = useDarkMode();
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const [isLangOpen, setIsLangOpen] = useState(false);
	const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

	const changeLanguage = (lang) => {
		i18n.changeLanguage(lang);
		setIsLangOpen(false);
	};

	const navLinkClass = ({isActive}) =>
		`px-4 py-2 block hover:text-primary ${
			isActive ? 'text-primary font-semibold' : 'text-gray-700 dark:text-gray-100'
		}`;

	return (
		<div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
			<header className="bg-gray-100 dark:bg-gray-800 shadow">
				<div className="container mx-auto px-4 py-4 flex justify-between items-center">
					<h1 className="text-xl font-bold">🌐 Agency</h1>

					{/* Desktop Menu */}
					<nav className="hidden md:flex space-x-6 items-center">
						<NavLink to="/" className={navLinkClass}>
							Home
						</NavLink>

						<div className="relative group">
							<button className="px-4 py-2 hover:text-primary" onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}>
								Services ▾
							</button>
							{isSubmenuOpen && (
								<div className="absolute top-full left-0 mt-1 w-40 bg-white dark:bg-gray-700 shadow-md rounded z-10">
									<NavLink to="/web-design" className={navLinkClass}>
										Web Design
									</NavLink>
									<NavLink to="/seo" className={navLinkClass}>
										SEO
									</NavLink>
								</div>
							)}
						</div>

						<NavLink to="/about" className={navLinkClass}>
							About
						</NavLink>
						<NavLink to="/contact" className={navLinkClass}>
							Contact
						</NavLink>

						{/* Language Dropdown (Desktop) */}
						<div className="relative">
							<button
								onClick={() => setIsLangOpen(!isLangOpen)}
								className="px-3 py-2 border rounded bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
							>
								🌐 {i18n.language.toUpperCase()}
							</button>
							{isLangOpen && (
								<div className="absolute top-full right-0 mt-1 w-28 bg-white dark:bg-gray-700 rounded shadow z-10">
									{['en', 'bn'].map((lang) => (
										<button
											key={lang}
											onClick={() => changeLanguage(lang)}
											className={`block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 ${
												i18n.language === lang ? 'font-bold text-primary' : ''
											}`}
										>
											{lang === 'en' ? 'English' : 'বাংলা'}
										</button>
									))}
								</div>
							)}
						</div>

						<button onClick={() => setIsDark(!isDark)} className="ml-2 px-2 py-1 border rounded">
							{isDark ? '🌙' : '☀️'}
						</button>
					</nav>

					{/* Mobile Hamburger */}
					<button className="md:hidden text-2xl" onClick={() => setIsMobileOpen(!isMobileOpen)}>
						<FiMenu />
					</button>
				</div>

				{/* Mobile Menu */}
				{isMobileOpen && (
					<div className="md:hidden px-4 pb-4 space-y-2 bg-white dark:bg-gray-800">
						<NavLink to="/" className={navLinkClass}>
							Home
						</NavLink>

						<div>
							<button className="w-full text-left px-4 py-2" onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}>
								Services ▾
							</button>
							{isSubmenuOpen && (
								<div className="pl-4">
									<NavLink to="/web-design" className={navLinkClass}>
										Web Design
									</NavLink>
									<NavLink to="/seo" className={navLinkClass}>
										SEO
									</NavLink>
								</div>
							)}
						</div>

						<NavLink to="/about" className={navLinkClass}>
							About
						</NavLink>
						<NavLink to="/contact" className={navLinkClass}>
							Contact
						</NavLink>

						{/* Language Dropdown (Mobile) */}
						<div className="px-4">
							<label className="block mb-1 text-sm font-medium">Language</label>
							<select
								value={i18n.language}
								onChange={(e) => changeLanguage(e.target.value)}
								className="w-full px-3 py-2 bg-white dark:bg-gray-700 border rounded"
							>
								<option value="en">English</option>
								<option value="bn">বাংলা</option>
							</select>
						</div>

						<button onClick={() => setIsDark(!isDark)} className="px-4 py-2 w-full text-left">
							{isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
						</button>
					</div>
				)}
			</header>

			<main className="flex-grow p-6">
				<Outlet />
			</main>

			<footer className="bg-gray-200 dark:bg-gray-800 p-4 text-center">
				© {new Date().getFullYear()} Agency — All rights reserved.
			</footer>
		</div>
	);
};

export default FrontendLayout;
