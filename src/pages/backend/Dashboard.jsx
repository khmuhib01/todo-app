import {useDispatch} from 'react-redux';
import {logout} from '../../store/slices/authSlice';
import {useNavigate} from 'react-router-dom';

const LogoutButton = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		navigate('/login');
	};

	return (
		<>
			<h2>Admin Dashboard</h2>
			<button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded mt-4">
				Logout
			</button>
		</>
	);
};

export default LogoutButton;
