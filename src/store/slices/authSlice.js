import {createSlice} from '@reduxjs/toolkit';

const getUserFromStorage = () => {
	const user = localStorage.getItem('user');
	const token = localStorage.getItem('token');
	return user && token ? {user: JSON.parse(user), token} : {user: null, token: null};
};

const initialState = getUserFromStorage();

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
			localStorage.setItem('user', JSON.stringify(action.payload.user));
			localStorage.setItem('token', action.payload.token);
		},
		logout: (state) => {
			state.user = null;
			state.token = null;
			localStorage.removeItem('user');
			localStorage.removeItem('token');
		},
	},
});

export const {loginSuccess, logout} = authSlice.actions;
export default authSlice.reducer;
