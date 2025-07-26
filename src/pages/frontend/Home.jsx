import React from 'react';
import {useTranslation} from 'react-i18next';
import {Helmet} from 'react-helmet-async';

export default function Home() {
	const {t} = useTranslation();
	return (
		<>
			<Helmet>
				<title>Home | MyApp</title>
				<meta name="description" content="This is the homepage of MyApp" />
				<meta property="og:title" content="Welcome to MyApp" />
			</Helmet>
			<div className="text-2xl p-6 font-bold text-green-600">🏠 Home Page (Lazy Loaded) {t('welcome')}</div>
			<button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded">Submit</button>
		</>
	);
}
