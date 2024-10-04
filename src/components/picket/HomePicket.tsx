import { Container, Flex, Heading, Box, VStack, Text } from '@chakra-ui/react';
import PicketCard from './PicketCard';

export default function HomePicket() {
	return (
		<Box flexBasis={'40%'} height={'full'} p={8} bg={'light-blue'} boxShadow={'base'} borderRadius={'lg'}>
			<Heading as={'h2'} size={'md'}>
				Dosen
			</Heading>

			<VStack spacing={6} mt={6}>
				<PicketCard />
				<PicketCard />
				<PicketCard />
				<PicketCard />
				<PicketCard />
			</VStack>
		</Box>
	);
}
