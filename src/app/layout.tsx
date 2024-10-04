import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { ChakraProviders, ReactQueryProvider } from './providers';

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Sistem Informasi Dosen',
	description: 'Pusat Informasi Program Studi Informatika Universitas Udayana',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<ReactQueryProvider>
					<ChakraProviders>{children}</ChakraProviders>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
