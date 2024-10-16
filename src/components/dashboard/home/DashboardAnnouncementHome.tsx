'use client';

import { getAnnouncement } from '@/api/announcement.api';
import AnnouncementCard from '@/components/announcement/AnnouncementCard';
import { Link } from '@chakra-ui/next-js';
import { Box, Center, Heading, HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardAnnouncementHome() {
	const router = useRouter();
	const page = 1;
	const limit = 2;
	const priority = 'penting';
	const { data, isPending, isError } = useQuery({
		queryKey: ['announcements', 'dashboard', 'home'],
		queryFn: () => getAnnouncement({ page, limit, priority }),
	});

	return (
		<Box w={'full'} padding={8} borderRadius={'lg'} boxShadow={'lg'}>
			<HStack justifyContent={'space-between'}>
				<Heading as={'h2'} size={'md'}>
					Pengumuman
				</Heading>
				<Link href='/dashboard/pengumuman'>
					<Center paddingX={4} paddingY={1} bg={'primary-blue'} color={'white'} borderRadius={'lg'}>
						<Text fontWeight={'700'}>Tambah</Text>
					</Center>
				</Link>
			</HStack>

			<Box marginTop={4}>
				{data === null && <Text>Tidak ada pengumuman</Text>}
				{isPending && (
					<VStack spacing={6} p={2}>
						{Array.from({ length: 2 }).map((_, index) => (
							<Skeleton key={index} w={'full'} h={'110px'}></Skeleton>
						))}
					</VStack>
				)}
				{data && data.length > 0 && (
					<VStack spacing={6}>
						{data.map((dat, index) => (
							<Box w={'full'} onClick={() => router.push('/pengumuman')}>
								<AnnouncementCard key={index} announcement={dat} />
							</Box>
						))}
					</VStack>
				)}
			</Box>
		</Box>
	);
}
