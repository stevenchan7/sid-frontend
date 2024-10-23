'use client';

import DashboardSidebar from '@/components/layouts/DashboardSidebar';
import useAuth from '@/hooks/useAuth';
import { Box, Container, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const { user, loading } = useAuth();
	const router = useRouter();

	if (loading) {
		return null;
	}

	if (user === null) {
		router.push('/login');
		return null;
	}

	return (
		<Flex flexDirection={'row'}>
			<DashboardSidebar role={user.role} />
			{children}
		</Flex>
	);
}
