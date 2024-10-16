'use client';

import { getAnnouncement } from '@/api/announcement.api';
import { useAnnouncementStore } from '@/stores/announcement.store';
import { Box, Skeleton, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import AnnouncementCard from './AnnouncementCard';

export default function AnnouncementList() {
	const announcements = useAnnouncementStore((state) => state.announcements);
	const setAnnouncements = useAnnouncementStore((state) => state.setAnnouncements);
	const setAnnouncementsPaginate = useAnnouncementStore((state) => state.setAnnouncementsPaginate);
	const search = useAnnouncementStore((state) => state.search);
	const [title, setTitle] = useState('');
	const [page, setPage] = useState(1);
	const limit = 20;
	const [hasMore, setHasMore] = useState(true);
	const [isLoading, setIsLoading] = useState(true);

	// const handleNext = async () => {
	// 	try {
	// 		const announcements = await getAnnouncement(page, limit, search);

	// 		if (announcements.length > 0) {
	// 			setAnnouncementsPaginate(announcements);
	// 			setPage(page + 1);
	// 		} else {
	// 			setHasMore(false);
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	function handleNext() {
		setPage(page + 1);
	}

	async function getAnnouncements(page: number, limit: number, search: string) {
		try {
			const announcements = await getAnnouncement({ page, limit, title: search });

			if (page === 1) {
				setAnnouncements(announcements);
			} else if (page > 1) {
				setAnnouncementsPaginate(announcements);
			}

			if (announcements.length < limit) {
				setHasMore(false);
			} else {
				// Cek apakah ada pengumuman selanjutnya
				const announcements = await getAnnouncement({ page: page + 1, limit, title: search });

				if (announcements.length === 0) {
					setHasMore(false);
				}
			}

			setIsLoading(false);
		} catch (error) {}
	}

	useEffect(() => {
		getAnnouncements(page, limit, search);
	}, [page]);

	useEffect(() => {
		setPage(1);
		setHasMore(true);
		getAnnouncements(page, limit, search);
	}, [search]);

	return (
		<Box flexBasis={'50%'} p={6} bg={'light-blue'} boxShadow={'base'} borderRadius={'lg'}>
			{isLoading && (
				<VStack spacing={6} p={2}>
					{Array.from({ length: 5 }).map((_, index) => (
						<Skeleton key={index} w={'full'} h={'110px'}></Skeleton>
					))}
				</VStack>
			)}

			{announcements.length === 0 && !isLoading && <Text textAlign={'center'}>Tidak ada pengumuman</Text>}

			{announcements.length > 0 && (
				<Box id='scrollableParent' height={'600px'} overflowY={'scroll'}>
					<InfiniteScroll
						dataLength={announcements.length}
						next={handleNext}
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
