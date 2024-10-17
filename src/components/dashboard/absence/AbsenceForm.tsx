import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';

export default function AbsenceForm() {
	return (
		<Box flexBasis={'50%'} w={'full'} borderRadius={'lg'} padding={6} boxShadow={'lg'}>
			<VStack spacing={6} alignItems={'flex-start'}>
				<Heading as={'h2'} size={'lg'}>
					Status Kehadiran Saat Ini
				</Heading>
				<VStack alignItems={'flex-start'} spacing={6}>
					<VStack alignItems={'flex-start'}>
						<Text>Status</Text>
						<Text>Mengajar</Text>
					</VStack>
					<VStack alignItems={'flex-start'}>
						<Text>Kegiatan</Text>
						<Text>Perkuliahan</Text>
					</VStack>
					<VStack alignItems={'flex-start'}>
						<Text>Lokasi</Text>
						<Text>Gedung BG Informatika</Text>
					</VStack>
					<VStack alignItems={'flex-start'}>
						<Text>Waktu</Text>
						<Text>08.00 - 15.00 WITA</Text>
					</VStack>
				</VStack>
				<Button margin={'auto'} w={'full'} bg={'primary-blue'} color={'white'}>
					Ubah Status
				</Button>
			</VStack>
		</Box>
	);
}
