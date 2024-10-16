'use client';

import { getAnnouncementUser } from '@/api/announcement.api';
import AnnouncementCard from '@/components/announcement/AnnouncementCard';
import { useAnnouncementStore } from '@/stores/announcement.store';
import { Box, Heading, Skeleton, Text, VStack } from '@chakra-ui/react';
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
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	function handleNext() {
		setPage(page + 1);
	}

	async function getAnnouncements(page: number, limit: number) {
		try {
			const announcements = await getAnnouncementUser({ page, limit });

			if (page === 1) {
				setAnnouncements(announcements);
			} else if (page > 1) {
				setAnnouncementsPaginate(announcements);
			}

			if (announcements.length < limit) {
				setHasMore(false);
			} else {
				// Cek apakah ada pengumuman selanjutnya
				const announcements = await getAnnouncementUser({ page: page + 1, limit });

				if (announcements.length === 0) {
					setHasMore(false);
				}
			}

			setIsLoading(false);
		} catch (error) {}
	}

	useEffect(() => {
		getAnnouncements(page, limit);
	}, [page]);

	return (
		<Box flexBasis={'60%'} padding={8} borderRadius={'lg'} boxShadow={'lg'}>
			<Heading as={'h2'} size={'lg'}>
				Pengumuman Anda
			</Heading>
			<Box>
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
								{announcements.map((announcement, index) => {
									console.log(announcement);
									return (
										<Box width={'full'} onClick={() => router.push('/pengumuman')}>
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
