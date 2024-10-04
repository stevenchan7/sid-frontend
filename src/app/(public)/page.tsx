import { Container, Flex, Heading, Box, VStack, Text } from '@chakra-ui/react';
import HomePicket from '@/components/picket/HomePicket';
import HomeAnnouncement from '@/components/announcement/HomeAnnouncement';

export default function Home() {
	return (
		<Container maxWidth={'container.xl'} marginY={20}>
			<Flex flexDirection={{ base: 'column', lg: 'row' }} gap={8}>
				<HomeAnnouncement />
				<HomePicket />
			</Flex>
		</Container>
	);
}
