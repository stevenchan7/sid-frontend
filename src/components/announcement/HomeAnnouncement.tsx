'use client';

import { Heading, Box, VStack, Text, Skeleton } from '@chakra-ui/react';
import AnnouncementCard from '@/components/announcement/AnnouncementCard';
import { useAnnouncementStore } from '@/stores/announcement.store';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getAnnouncement } from '@/api/announcement.api';
import { Link } from '@chakra-ui/next-js';
import { useRouter } from 'next/navigation';

export default function HomeAnnouncement() {
  const announcements = useAnnouncementStore((state) => state.announcements);
  const setAnnouncements = useAnnouncementStore((state) => state.setAnnouncements);
  const router = useRouter();

  const page = 1;
  const limit = 5;

  const { data, isLoading } = useQuery({
    queryKey: ['announcements', 'home'],
    queryFn: () => getAnnouncement({ page, limit }),
  });

  useEffect(() => {
    if (data) {
      setAnnouncements(data);
    }
  }, [data]);

  return (
    <Box flexBasis={'60%'} minHeight={'729px'} p={8} bg={'light-blue'} boxShadow={'base'} borderRadius={'lg'}>
      <Heading as={'h2'} size={'md'}>
        Pengumuman
      </Heading>

      <VStack spacing={6} mt={6}>
        {isLoading && Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} w={'full'} h={'110px'}></Skeleton>)}

        {data === null && <Text>Tidak ada pengumuman</Text>}

        {announcements &&
          announcements.length > 0 &&
          announcements.map((announcement, index) => (
            <Box key={index} w={'full'} onClick={() => router.push('/pengumuman')}>
              <AnnouncementCard announcement={announcement} />
            </Box>
          ))}
      </VStack>
    </Box>
  );
}
