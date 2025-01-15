import Lecturer from '@/types/lecturer.type';
import { Avatar, AvatarBadge, Box, HStack, Text } from '@chakra-ui/react';
import { MdOutlineLocationOn, MdOutlineLibraryBooks } from 'react-icons/md';

export default function PicketCard({ lecturer }: { lecturer: Lecturer }) {
  return (
    <Box bg={'white'} borderRadius={'lg'} w={'full'} p={2} boxShadow={'base'}>
      <HStack spacing={4}>
        <Avatar name='Suhartana' src=''>
          <AvatarBadge boxSize='1em' bg='green.500' />
        </Avatar>

        <Box>
          <Text fontWeight={'bold'}>{lecturer.name}</Text>
          <HStack>
            <MdOutlineLocationOn />
            <Text fontSize={'sm'}>{lecturer.absences[0].location}</Text>
          </HStack>
          <HStack>
            <MdOutlineLibraryBooks />
            <Text fontSize={'sm'}>{lecturer.absences[0].activity}</Text>
          </HStack>
        </Box>
      </HStack>
    </Box>
  );
}
