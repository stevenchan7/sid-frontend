'use client';

import { getAnnouncement } from '@/api/announcement.api';
import { useAnnouncementStore } from '@/stores/announcement.store';
import { Box, Skeleton, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import AnnouncementCard from './AnnouncementCard';
import { useQuery } from '@tanstack/react-query';
import Announcement from '@/types/announcement.type';

export default function AnnouncementList() {
	const announcements = useAnnouncementStore((state) => state.announcements);
	const setAnnouncements = useAnnouncementStore((state) => state.setAnnouncements);
	const setAnnouncementsPaginate = useAnnouncementStore((state) => state.setAnnouncementsPaginate);
	const search = useAnnouncementStore((state) => state.search);
	const [page, setPage] = useState(1);
	const limit = 20;
	const [hasMore, setHasMore] = useState(true);

	function onNext() {
		setPage(page + 1);
	}

	const { data, isPending, refetch } = useQuery<Announcement[]>({
		queryKey: ['announcements', 'all', page],
		queryFn: () => getAnnouncement({ page, limit, title: search }),
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

	useEffect(() => {
		setPage(1); // Reset to page 1 when the search term changes
		setHasMore(true); // Reset hasMore in case new search has more data
		// Trigger data refetch based on new search term
		refetch().then((result) => {
			// Manually check if no results or fewer results than limit
			if (!result.data || result.data.length < limit) {
				setHasMore(false); // No more data to load
			}
		});
	}, [search]);

	return (
		<Box flexBasis={'50%'} p={6} bg={'light-blue'} boxShadow={'base'} borderRadius={'lg'}>
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
						loader={
							<Text marginTop={6} textAlign={'center'}>
								Loading
							</Text>
						}
						endMessage={
							<Text marginTop={6} textAlign={'center'}>
								Tidak ada lagi pengumuman
							</Text>
						}
					>
						<VStack p={2} spacing={6} overflow={'visible'}>
							{announcements.map((announcement, index) => (
								<AnnouncementCard key={index} announcement={announcement} />
							))}
						</VStack>
					</InfiniteScroll>
				</Box>
			)}
		</Box>
	);
}
