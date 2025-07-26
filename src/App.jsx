import {ToastContainer} from 'react-toastify';
import AppRoutes from './router/AppRoutes';

function App() {
	return (
		<>
			<AppRoutes />
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				pauseOnHover
				theme="colored"
			/>
		</>
	);
}

export default App;
