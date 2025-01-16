import { useAnnouncementStore } from '@/stores/announcement.store';
import announcement from '@/types/announcement.type';
import { Avatar, Badge, Box, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function AnnouncementCard({ announcement }: { announcement: announcement }) {
  const [content, setContent] = useState('');
  const selectedAnnouncement = useAnnouncementStore((state) => state.selectedAnnouncement);
  const setSelectedAnnouncement = useAnnouncementStore((state) => state.setSelectedAnnouncement);
  const isSelected = selectedAnnouncement?.id === announcement.id;

  const sliceContent = (content: string) => {
    var contentArr = content.split(' ');

    if (contentArr.length > 15) {
      contentArr = contentArr.slice(0, 15);
      setContent(contentArr.join(' ') + '...');
      return;
    }

    setContent(announcement.content);
  };

  const handleOnClick = () => {
    setSelectedAnnouncement(announcement);
  };

  useEffect(() => {
    sliceContent(announcement.content);
  }, []);

  return (
    <Box
      onClick={handleOnClick}
      w={'full'}
      p={3}
      _hover={{ transform: 'scale(1.03)', transition: 'transform 0.1s ease-in-out' }}
      borderRadius={'lg'}
      boxShadow={'md'}
      bg={isSelected ? 'EBF8FF' : 'white'}
      cursor={'pointer'}
    >
      <Stack spacing={2}>
        <HStack spacing={2}>
          <Text fontWeight={'bold'}>{announcement.title}</Text>
          {announcement.priority === 'penting' ? (
            <Badge variant={'solid'} colorScheme={'red'} fontSize={'2xs'}>
              Penting
            </Badge>
          ) : (
            <Badge variant={'solid'} colorScheme={'green'} fontSize={'2xs'}>
              Normal
            </Badge>
          )}
        </HStack>
        <Text fontSize={'sm'}>{content}</Text>
        <HStack>
          <Text fontSize={'xs'}>{announcement.lecturer.name}</Text>
          <Avatar size={'2xs'} name={announcement.lecturer.name} src={announcement.lecturer.profile_url} />
        </HStack>
      </Stack>
    </Box>
  );
}
