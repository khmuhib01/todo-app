import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Suspense, lazy} from 'react';
import FrontendLayout from '../layouts/FrontendLayout';
import BackendLayout from '../layouts/BackendLayout';
import ProtectedRoute from './ProtectedRoute';
import Todo from '../pages/frontend/Todo';

// Lazy load pages
const Home = lazy(() => import('../pages/frontend/Home'));
const About = lazy(() => import('../pages/frontend/About'));
const Dashboard = lazy(() => import('../pages/backend/Dashboard'));
const Users = lazy(() => import('../pages/backend/Users'));
const Login = lazy(() => import('../pages/Login'));

const AppRoutes = () => (
	<BrowserRouter>
		<Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
			<Routes>
				{/* <Route path="/" element={<FrontendLayout />}>
					<Route index element={<Home />} />
					<Route path="about" element={<About />} />
				</Route> */}

				<Route index path="/" element={<Todo />} />

				<Route
					path="/admin"
					element={
						<ProtectedRoute>
							<BackendLayout />
						</ProtectedRoute>
					}
				>
					<Route index element={<Dashboard />} />
					<Route path="users" element={<Users />} />
				</Route>
			</Routes>
		</Suspense>
	</BrowserRouter>
);

export default AppRoutes;
