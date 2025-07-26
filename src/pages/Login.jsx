import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {toast} from 'react-toastify';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../store/slices/authSlice';
import {useNavigate} from 'react-router-dom';

const schema = yup.object().shape({
	email: yup.string().email('Invalid email').required('Email is required'),
	password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});

export default function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data) => {
		// ✅ Handle login logic
		dispatch(
			loginSuccess({
				user: {name: 'Demo User', email: data.email},
				token: 'dummy-token',
			})
		);
		toast.success('Login successful!');
		navigate('/admin');
	};

	return (
		<div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow rounded">
			<h2 className="text-2xl font-bold mb-6 text-center">🔐 Login</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div>
					<label className="block mb-1">Email</label>
					<input
						type="email"
						{...register('email')}
						className="w-full px-3 py-2 border rounded bg-gray-50 dark:bg-gray-700"
					/>
					{errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
				</div>

				<div>
					<label className="block mb-1">Password</label>
					<input
						type="password"
						{...register('password')}
						className="w-full px-3 py-2 border rounded bg-gray-50 dark:bg-gray-700"
					/>
					{errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
				</div>

				<button type="submit" className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
					Login
				</button>
			</form>
		</div>
	);
}
