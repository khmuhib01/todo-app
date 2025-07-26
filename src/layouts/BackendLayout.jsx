import {Outlet} from 'react-router-dom';
import {FiMenu, FiBell, FiSettings, FiMoreVertical, FiSun, FiMoon} from 'react-icons/fi';
import {useState, useEffect} from 'react';

const BackendLayout = () => {
	const [toggle, setToggle] = useState(true);
	const [isDarkMode, setIsDarkMode] = useState(false);

	const handleToggle = () => {
		setToggle((prev) => !prev);
	};

	const toggleTheme = () => {
		setIsDarkMode((prev) => !prev);
	};

	// Apply dark mode to <html> tag
	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [isDarkMode]);

	return (
		<div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white relative">
			{/* Sidebar */}
			<div
				className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 z-30 transform transition-transform duration-300 ${
					toggle ? 'translate-x-0' : '-translate-x-full'
				}`}
			>
				{/* Logo */}
				<div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
					<h1 className="text-2xl font-bold">🌐 Agency</h1>
				</div>

				{/* Navigation Menu */}
				<nav className="flex flex-col p-4 space-y-1 overflow-y-auto h-[calc(100%-4rem)] pb-20">
					<NavItem icon="🏠" label="Dashboard" />
					<NavItem icon="👥" label="Users" />
					<NavItem icon="📦" label="Products" />
					<SubMenu label="Settings" icon="⚙️">
						<NavItem label="Profile Settings" small />
						<NavItem label="Billing" small />
						<NavItem label="Security" small />
					</SubMenu>
					<NavItem icon="📊" label="Reports" />
					<NavItem icon="📨" label="Messages" />
				</nav>

				{/* Logout button fixed at bottom */}
				<div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
					<button className="w-full text-left bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
						🚪 Logout
					</button>
				</div>
			</div>

			{/* Main Content */}
			<div className={`flex-1 min-h-screen transition-all duration-300 ${toggle ? 'ml-64' : 'ml-0'}`}>
				{/* Topbar */}
				<div className="bg-white dark:bg-gray-800 py-4 px-4 shadow-md flex justify-between items-center">
					<FiMenu className="w-6 h-6 cursor-pointer" onClick={handleToggle} />
					<div className="flex items-center space-x-4">
						<button onClick={toggleTheme}>
							{isDarkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
						</button>
						<button>
							<FiBell className="w-5 h-5" />
						</button>
						<button>
							<FiSettings className="w-5 h-5" />
						</button>
						<button>
							<FiMoreVertical className="w-5 h-5" />
						</button>
					</div>
				</div>

				{/* Page Content */}
				<div className="px-4 py-6">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default BackendLayout;

// Reusable NavItem component
const NavItem = ({icon, label, small = false}) => (
	<div
		className={`cursor-pointer px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
			small ? 'pl-8 text-sm text-gray-600 dark:text-gray-400' : 'font-medium'
		}`}
	>
		{icon && <span className="mr-2">{icon}</span>}
		{label}
	</div>
);

// SubMenu component
const SubMenu = ({label, icon, children}) => {
	const [open, setOpen] = useState(false);

	return (
		<div>
			<div
				onClick={() => setOpen(!open)}
				className="cursor-pointer px-3 py-2 rounded font-medium hover:bg-gray-200 dark:hover:bg-gray-700 flex justify-between items-center"
			>
				<span>
					{icon && <span className="mr-2">{icon}</span>}
					{label}
				</span>
				<span>{open ? '▲' : '▼'}</span>
			</div>
			{open && <div className="ml-2 mt-1">{children}</div>}
		</div>
	);
};
