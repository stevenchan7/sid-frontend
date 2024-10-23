import { Box, Heading, Container, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

export default function DashboardScheduleLayout({ children }: { children: ReactNode }) {
	return (
		<Box w={'full'}>
			<Box paddingX={{ base: 10, lg: 20 }} paddingY={{ base: 3, lg: 6 }} bg={'#F8F9FA'}>
				<Heading size={'2xl'}>Jadwal Mengajar</Heading>
			</Box>
			<Container maxW={'container.xl'} marginTop={8}>
				{children}
			</Container>
		</Box>
	);
}
