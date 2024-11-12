'use client';

import useAuth from '@/hooks/useAuth';
import { Box, Heading, Container } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export default function PicketPageLayout({ children }: { children: ReactNode }) {
	const { user, loading } = useAuth();
	const router = useRouter();

	if (loading) {
		return null;
	}

	if (user === null || user.role !== 'admin') {
		router.push('/login');
		return null;
	}

	return (
		<Box w={'full'}>
			<Box paddingX={{ base: 10, lg: 20 }} paddingY={{ base: 3, lg: 6 }} bg={'#F8F9FA'}>
				<Heading size={'2xl'}>Jadwal Piket</Heading>
			</Box>
			<Container maxW='container.lg' marginTop={8}>
				{children}
			</Container>
		</Box>
	);
}
