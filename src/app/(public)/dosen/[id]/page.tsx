'use client';

import { getLecturerById } from '@/api/lecturer.api';
import Lecturer from '@/types/lecturer.type';
import Schedule from '@/types/schedule.type';
import {
  Avatar,
  Box,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Skeleton,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

export default function LecturerDetailPage({ params }: { params: { id: string } }) {
  const lecturerId = Number(params.id);
  const [lecturer, setLecturer] = useState<Lecturer | null>(null);
  const [scheduleGroupByDay, setScheduleGroupByDay] = useState<Record<string, Schedule[]>>({
    senin: [],
    selasa: [],
    rabu: [],
    kamis: [],
    jumat: [],
  });
  const days = ['senin', 'selasa', 'rabu', 'kamis', 'jumat'];
  const { data, isPending } = useQuery({
    queryKey: ['lecturers', lecturerId],
    queryFn: () => getLecturerById(lecturerId),
  });

  useEffect(() => {
    if (data) setLecturer(data);
  }, [data]);

  useEffect(() => {
    if (lecturer && lecturer.schedules) {
      const scheduleGroupByDay: Record<string, Schedule[]> = {
        senin: [],
        selasa: [],
        rabu: [],
        kamis: [],
        jumat: [],
      };

      lecturer.schedules.map((schedule) => {
        scheduleGroupByDay[schedule.day].push(schedule);
      });

      setScheduleGroupByDay(scheduleGroupByDay);
    }
  }, [lecturer]);

  if (isPending) {
    return (
      <Container maxW='container.xl' marginY={8}>
        <Box>
          <VStack gap={8}>
            <Skeleton w='full' h='300px' />
            <Skeleton w='full' h='300px' />
          </VStack>
        </Box>
      </Container>
    );
  }

  if (lecturer)
    return (
      <Container maxW='container.xl' marginY={8}>
        <Box>
          <VStack gap={8}>
            <Box w='full'>
              <Flex flexDirection={{ base: 'column', lg: 'row' }} justifyContent='center' alignItems='center' gap={12}>
                <Box>
                  <Avatar src={lecturer.profile_url} name={lecturer.name} size={'2xl'} boxSize={'10rem'} borderRadius={'lg'} />
                </Box>

                <Box w='full'>
                  <VStack spacing={6}>
                    <FormControl>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <Input value={lecturer.name} disabled />
                    </FormControl>

                    <HStack w={'full'}>
                      <FormControl>
                        <FormLabel>NIP</FormLabel>
                        <Input value={lecturer.nip} disabled />
                      </FormControl>

                      <FormControl>
                        <FormLabel>NIDN</FormLabel>
                        <Input value={lecturer.nidn} disabled />
                      </FormControl>
                    </HStack>

                    <HStack w={'full'}>
                      <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input value={lecturer.email} disabled />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Telepon</FormLabel>
                        <Input value={lecturer.phone_number} disabled />
                      </FormControl>
                    </HStack>

                    <FormControl>
                      <FormLabel>Alamat</FormLabel>
                      <Input value={lecturer.address} disabled />
                    </FormControl>
                  </VStack>
                </Box>
              </Flex>
            </Box>

            <Box w='full'>
              <Flex flexDirection={{ base: 'column', lg: 'row' }} justifyContent={'center'} gap={12}>
                <Box flexBasis='30%' w='full' h='100%' overflow='hidden' borderRadius='lg' boxShadow='base'>
                  <Box py={2} bgColor='primary-blue' color='white' textAlign='center'>
                    <Text fontWeight={600}>Status</Text>
                  </Box>

                  <Box px={6} py={3}>
                    {lecturer.absences && lecturer.absences.length > 0 ? (
                      <VStack alignItems='flex-start' gap={2}>
                        <Box>
                          <HStack>
                            <VStack alignItems='flex-start' gap={0}>
                              <Text fontWeight={600}>Status</Text>
                              <Text>{lecturer.absences[0].status}</Text>
                            </VStack>
                          </HStack>
                        </Box>

                        <Divider />

                        <Box>
                          <HStack>
                            <VStack alignItems='flex-start' gap={0}>
                              <Text fontWeight={600}>Lokasi</Text>
                              <Text>{lecturer.absences[0].location}</Text>
                            </VStack>
                          </HStack>
                        </Box>

                        <Divider />

                        <Box>
                          <HStack>
                            <VStack alignItems='flex-start' gap={0}>
                              <Text fontWeight={600}>Kegiatan</Text>
                              <Text>{lecturer.absences[0].activity}</Text>
                            </VStack>
                          </HStack>
                        </Box>

                        <Divider />

                        <Box>
                          <HStack>
                            <VStack alignItems='flex-start' gap={0}>
                              <Text fontWeight={600}>Jadwal Piket</Text>
                              <Text>
                                {lecturer.pickets[0].day[0].toUpperCase() + lecturer.pickets[0].day.slice(1)}, {lecturer.pickets[0].location}
                              </Text>
                            </VStack>
                          </HStack>
                        </Box>
                      </VStack>
                    ) : (
                      <Text>Status hari ini belum diperbarui</Text>
                    )}
                  </Box>
                </Box>

                <Box flexBasis='70%' w='full'>
                  <VStack gap={3}>
                    <Box>
                      <Text>Jadwal Mengajar</Text>
                    </Box>

                    <Divider />

                    <Box w='full'>
                      <Tabs w={'full'}>
                        <TabList>
                          {days.map((day, index) => (
                            <Tab key={index}>{day.charAt(0).toUpperCase() + day.slice(1)}</Tab>
                          ))}
                        </TabList>
                        <TabPanels>
                          {days.map((day) => (
                            <TabPanel key={day}>
                              {/* Table */}
                              <TableContainer maxH='300px' overflowY='auto'>
                                <Table variant='striped' colorScheme='table'>
                                  <Thead>
                                    <Tr>
                                      {['Mata Kuliah', 'Waktu', 'Kelas'].map((title) => (
                                        <Th key={title} fontSize={'md'} fontWeight={600} textTransform={'capitalize'}>
                                          {title}
                                        </Th>
                                      ))}
                                    </Tr>
                                  </Thead>
                                  <Tbody>
                                    {scheduleGroupByDay[day].map((schedule) => (
                                      <Tr key={schedule.id}>
                                        <Td>{schedule.lecture.name}</Td>
                                        <Td>
                                          {schedule.start_time} - {schedule.end_time}
                                        </Td>
                                        <Td>{schedule.classif}</Td>
                                      </Tr>
                                    ))}
                                  </Tbody>
                                </Table>
                              </TableContainer>
                              {/* Table */}
                            </TabPanel>
                          ))}
                        </TabPanels>
                      </Tabs>
                    </Box>
                  </VStack>
                </Box>
              </Flex>
            </Box>
          </VStack>
        </Box>
      </Container>
    );
}
