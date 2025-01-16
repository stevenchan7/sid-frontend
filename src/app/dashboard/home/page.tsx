'use client';

import DashboardAnnouncementHome from '@/components/dashboard/home/DashboardAnnouncementHome';
import DashboardHomePicket from '@/components/dashboard/home/DashboardHomePicket';
import useAuth from '@/hooks/useAuth';
import { Link } from '@chakra-ui/next-js';
import { Avatar, AvatarBadge, Box, Button, Container, Flex, Heading, HStack, Icon, Stack, Text, VStack } from '@chakra-ui/react';
import { MdOutlineLibraryBooks, MdOutlineLocationOn } from 'react-icons/md';

export default function DashboardHome() {
  const { user } = useAuth();

  return (
    <Box w={'full'}>
      <Box paddingX={{ base: 10, lg: 20 }} paddingY={{ base: 3, lg: 6 }} bg={'#F8F9FA'}>
        <Heading size={'2xl'}>Dashboard</Heading>
      </Box>
      <Container maxW={'container.xl'} marginTop={8}>
        <Flex flexDirection={'row'} gap={8}>
          <VStack flexBasis={'50%'}>
            {/* Status anda box */}
            {user && (
              <Box w={'full'} padding={8} borderRadius={'lg'} boxShadow={'lg'}>
                <Heading as={'h2'} size={'md'}>
                  Status Anda
                </Heading>
                <Box marginTop={4}>
                  <HStack spacing={8}>
                    <Avatar src={user.profileUrl} name={user.name} size={'xl'} borderRadius={4} />
                    <Box>
                      <Text fontWeight={700}>{user.name}</Text>
                      {user.absence ? (
                        <VStack marginTop={2} alignItems={'flex-start'} fontSize={'smaller'}>
                          <HStack>
                            <Box borderRadius={'full'} boxSize={'1rem'} bg={'tomato'}></Box>
                            <Text>{user.absence.status}</Text>
                          </HStack>
                          <HStack>
                            <Icon as={MdOutlineLibraryBooks} boxSize={'1rem'} />
                            <Text>{user.absence.activity}</Text>
                          </HStack>
                          <HStack>
                            <Icon as={MdOutlineLocationOn} boxSize={'1rem'} />
                            <Text>{user.absence.location}</Text>
                          </HStack>
                        </VStack>
                      ) : (
                        <Link href='/dashboard/kehadiran' mt={2} fontSize='smaller'>
                          Perbarui Kehadiran
                        </Link>
                      )}
                    </Box>
                  </HStack>
                </Box>
                <HStack justifyContent={'center'} marginTop={4}>
                  <Button colorScheme='blue' flexGrow={1}>
                    Ubah Status
                  </Button>
                  <Button colorScheme='blue' variant={'outline'} flexGrow={1} borderWidth={'2px'}>
                    Edit Profile
                  </Button>
                </HStack>
              </Box>
            )}
            {/* Status anda box */}

            <DashboardAnnouncementHome />
          </VStack>

          <DashboardHomePicket />
        </Flex>
      </Container>
    </Box>
  );
}
