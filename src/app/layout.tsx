import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { ReactNode } from 'react';

export const metadata: Metadata = {
	title: 'V Vinstory Club',
	description: 'Каталог кроссовок',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="ru">
			<head>
				<Script src="https://telegram.org/js/telegram-web-app.js" strategy="afterInteractive" />
			</head>
			<body>
				<header className="sticky-header">
					<div className="container-max h-14 flex items-center justify-between">
						<div className="font-semibold tracking-tight">V Vinstory Club</div>
					</div>
				</header>
				<main className="container-max py-4">{children}</main>
			</body>
		</html>
	);
}