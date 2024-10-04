import { Avatar, AvatarBadge, Box, HStack, Text } from '@chakra-ui/react';
import { MdOutlineLocationOn, MdOutlineLibraryBooks } from 'react-icons/md';

export default function PicketCard() {
	return (
		<Box bg={'white'} borderRadius={'lg'} w={'full'} p={2} boxShadow={'base'}>
			<HStack spacing={4}>
				<Avatar name='Suhartana' src=''>
					<AvatarBadge boxSize='1em' bg='green.500' />
				</Avatar>

				<Box>
					<Text fontWeight={'bold'}>Suhartana</Text>
					<HStack>
						<MdOutlineLocationOn />
						<Text fontSize={'sm'}>Gedung BG Informatika</Text>
					</HStack>
					<HStack>
						<MdOutlineLibraryBooks />
						<Text fontSize={'sm'}>Mengajar Algortima dan Pemrograman</Text>
					</HStack>
				</Box>
			</HStack>
		</Box>
	);
}
