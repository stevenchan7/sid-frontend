'use client';

import { Container, Flex, Heading, Box, VStack, Text } from '@chakra-ui/react';
import PicketCard from './PicketCard';
import { useLecturerStore } from '@/stores/lecturer.store';
import { useQuery } from '@tanstack/react-query';
import { getLecturer } from '@/api/lecturer.api';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Lecturer from '@/types/lecturer.type';

export default function HomePicket() {
  const { lecturers, setLecturers } = useLecturerStore();
  const [lecturersWithAbsence, setLecturersWithAbsence] = useState<Lecturer[]>([]);

  const { data, isPending } = useQuery({
    queryKey: ['lecturers'],
    queryFn: () => getLecturer(),
  });

  const filterLecturerWithAbsence = (lecturers: Lecturer[]) => {
    return lecturers.filter((lecturer) => lecturer.absences.length > 0);
  };

  useEffect(() => {
    if (data) {
      setLecturers(data);
    }
  }, [data]);

  useEffect(() => {
    if (lecturers) {
      const lecturersWithAbsence = filterLecturerWithAbsence(lecturers);

      setLecturersWithAbsence(lecturersWithAbsence);
    }
  }, [lecturers]);

  return (
    <Box flexBasis={'40%'} height={'full'} p={8} bg={'light-blue'} boxShadow={'base'} borderRadius={'lg'}>
      <Heading as={'h2'} size={'md'}>
        Dosen
      </Heading>

      <Box id='scrollableParent' maxH={'600px'} overflowY='auto'>
        {lecturersWithAbsence && lecturersWithAbsence.length > 0 ? (
          <VStack spacing={6} mt={6}>
            {lecturersWithAbsence.map((lecturer) => {
              if (lecturer.absences.length > 0) {
                return <PicketCard key={lecturer.id} lecturer={lecturer} />;
              }
            })}
          </VStack>
        ) : (
          <Text mt={6}>Tidak ada informasi dosen hari ini</Text>
        )}
      </Box>
    </Box>
  );
}
