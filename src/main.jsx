import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {store} from './store';
import {Provider} from 'react-redux';
import './index.css';
import './i18n';
import 'react-toastify/dist/ReactToastify.css';
import {HelmetProvider} from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<HelmetProvider>
				<App />
			</HelmetProvider>
		</Provider>
	</React.StrictMode>
);
