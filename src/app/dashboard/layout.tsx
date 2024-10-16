import DashboardSidebar from '@/components/layouts/DashboardSidebar';
import { Box, Container, Flex } from '@chakra-ui/react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<Flex flexDirection={'row'}>
			<DashboardSidebar />
			{children}
		</Flex>
	);
}
