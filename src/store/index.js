import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import todoReducer from './slices/todoSlice';
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
	key: 'auth',
	storage,
};

const todoPersistConfig = {
	key: 'todo',
	storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedTodoReducer = persistReducer(todoPersistConfig, todoReducer);

export const store = configureStore({
	reducer: {
		auth: persistedAuthReducer,
		todo: persistedTodoReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);
