import AbsenceForm from '@/components/dashboard/absence/AbsenceForm';
import AbsenceHistoryList from '@/components/dashboard/absence/AbsenceHistoryList';
import { Box, Container, Flex, Heading } from '@chakra-ui/react';

export default function DashboardAbsence() {
	return (
		<Box w={'full'}>
			<Box paddingX={{ base: 10, lg: 20 }} paddingY={{ base: 3, lg: 6 }} bg={'#F8F9FA'}>
				<Heading size={'2xl'}>Status Kehadiran</Heading>
			</Box>
			<Container maxW={'container.xl'} marginTop={8}>
				<Flex flexDirection={{ base: 'column', lg: 'row' }} gap={8}>
					<AbsenceForm />
					<AbsenceHistoryList />
				</Flex>
			</Container>
		</Box>
	);
}
