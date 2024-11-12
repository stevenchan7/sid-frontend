'use client';

import { useAbsenceStore } from '@/stores/absence.store';
import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

export default function AbsenceHistoryList() {
	const { absenceHistory } = useAbsenceStore();
	dayjs.locale('id');

	return (
		<Box flexBasis={'50%'} w={'full'}>
			<Box w={'full'} borderRadius={'lg'} padding={6} boxShadow={'lg'}>
				<Heading as={'h2'} size={'lg'}>
					Riwayat Kehadiran
				</Heading>
			</Box>
			<VStack>
				{absenceHistory.map((absence) => (
					<Box key={absence.id} w={'full'} borderRadius={'lg'} padding={6} boxShadow={'lg'}>
						<Heading as={'h3'} size={'md'}>
							{dayjs(absence.createdAt).format('dddd, D MMM YYYY')}
						</Heading>
						<HStack marginTop={4}>
							<VStack w={'full'} alignItems={'flex-start'} spacing={3}>
								<VStack alignItems={'flex-start'}>
									<Text>Status</Text>
									<Text>{absence.status}</Text>
								</VStack>
								<VStack alignItems={'flex-start'}>
									<Text>Lokasi</Text>
									<Text>{absence.location}</Text>
								</VStack>
							</VStack>
							<VStack w={'full'} alignItems={'flex-start'} spacing={3}>
								<VStack alignItems={'flex-start'}>
									<Text>Kegiatan</Text>
									<Text>{absence.activity}</Text>
								</VStack>
								<VStack alignItems={'flex-start'}>
									<Text>Waktu</Text>
									<Text>08.00 - 15.00 WITA</Text>
								</VStack>
							</VStack>
						</HStack>
					</Box>
				))}
			</VStack>
		</Box>
	);
}
