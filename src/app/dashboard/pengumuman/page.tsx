import AnnouncementForm from '@/components/dashboard/announcement/AnnouncementForm';
import DashboardAnnouncementList from '@/components/dashboard/announcement/DashboardAnnouncementList';
import { Avatar, AvatarBadge, Box, Button, Container, Flex, Heading, HStack, Icon, Stack, Text, VStack } from '@chakra-ui/react';

export default function DashboardAnnouncement() {
	return (
		<Box w={'full'}>
			<Box paddingX={{ base: 10, lg: 20 }} paddingY={{ base: 3, lg: 6 }} bg={'#F8F9FA'}>
				<Heading size={'2xl'}>Pengumuman</Heading>
			</Box>
			<Container maxW={'container.xl'} marginTop={8}>
				<Flex flexDirection={{ base: 'column', lg: 'row' }} gap={8}>
					<AnnouncementForm />
					<DashboardAnnouncementList />
				</Flex>
			</Container>
		</Box>
	);
}
