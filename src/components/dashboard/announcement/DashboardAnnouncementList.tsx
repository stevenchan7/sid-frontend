'use client';

import { getAnnouncementUser } from '@/api/announcement.api';
import AnnouncementCard from '@/components/announcement/AnnouncementCard';
import { useAnnouncementStore } from '@/stores/announcement.store';
import Announcement from '@/types/announcement.type';
import { Box, Heading, Skeleton, Text, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function DashboardAnnouncementList() {
	const announcements = useAnnouncementStore((state) => state.announcements);
	const setAnnouncements = useAnnouncementStore((state) => state.setAnnouncements);
	const setAnnouncementsPaginate = useAnnouncementStore((state) => state.setAnnouncementsPaginate);
	const [page, setPage] = useState(1);
	const limit = 20;
	const [hasMore, setHasMore] = useState(true);
	const router = useRouter();

	function onNext() {
		setPage(page + 1);
	}

	const { data, isPending } = useQuery<Announcement[]>({
		queryKey: ['announcements', 'user', page],
		queryFn: () => getAnnouncementUser({ page, limit }),
	});

	useEffect(() => {
		if (data) {
			if (data.length < limit) {
				setHasMore(false);
			}

			if (page === 1) {
				setAnnouncements(data);
			} else {
				setAnnouncementsPaginate(data);
			}
		}
	}, [data]);

	return (
		<Box flexBasis={'60%'} padding={8} borderRadius={'lg'} boxShadow={'lg'}>
			<Heading as={'h2'} size={'lg'}>
				Pengumuman Anda
			</Heading>
			<Box>
				{isPending && page === 1 && (
					<VStack spacing={6} p={2}>
						{Array.from({ length: 5 }).map((_, index) => (
							<Skeleton key={index} w={'full'} h={'110px'}></Skeleton>
						))}
					</VStack>
				)}

				{announcements.length === 0 && !isPending && <Text textAlign={'center'}>Tidak ada pengumuman</Text>}

				{announcements.length > 0 && (
					<Box id='scrollableParent' height={'600px'} overflowY={'scroll'}>
						<InfiniteScroll
							dataLength={announcements.length}
							next={onNext}
							hasMore={hasMore}
							scrollableTarget='scrollableParent'
							loader={<h4>Loading...</h4>}
							endMessage={
								<Text marginTop={6} textAlign={'center'}>
									Tidak ada lagi pengumuman
								</Text>
							}
						>
							<VStack p={2} spacing={6} overflow={'visible'}>
								{announcements.map((announcement, index) => {
									return (
										<Box key={index} width={'full'} onClick={() => router.push('/pengumuman')}>
											<AnnouncementCard key={index} announcement={announcement} />
										</Box>
									);
								})}
							</VStack>
						</InfiniteScroll>
					</Box>
				)}
			</Box>
		</Box>
	);
}
