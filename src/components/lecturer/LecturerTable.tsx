'use client';

import { getLecturer } from '@/api/lecturer.api';
import { useLecturerStore } from '@/stores/lecturer.store';
import { Link } from '@chakra-ui/next-js';
import { Avatar, AvatarBadge, Box, Button, Center, Flex, HStack, Skeleton, Text } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import LecturerTablePagination from './LecturerTablePagination';
import Lecturer from '@/types/lecturer.type';

export default function LecturerTable({ search }: { search: string }) {
  const { lecturers, setLecturers } = useLecturerStore();
  const [filteredLecturers, setfilteredLecturers] = useState<Lecturer[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;
  const totalPage = Math.ceil(filteredLecturers.length / limit);

  const { data, isPending } = useQuery({
    queryKey: ['lecturers'],
    queryFn: () => getLecturer(),
  });

  function filterLecturer(search: string) {
    const filteredLecturers = lecturers.filter((lecturer) => {
      return lecturer.name.includes(search) || lecturer.nip.includes(search);
    });

    setfilteredLecturers(filteredLecturers);
  }

  useEffect(() => {
    if (data) {
      setLecturers(data);
      setfilteredLecturers(data);
    }
  }, [data]);

  useEffect(() => {
    filterLecturer(search);
    setPage(1);
  }, [search]);

  if (isPending) {
    return <Skeleton marginTop={8} w={'full'} height={'50vh'} isLoaded={!isPending} />;
  } else {
    return (
      <>
        <TableContainer marginTop={8}>
          <Table variant='striped' colorScheme='table'>
            <Thead>
              <Tr>
                {['Nama Dosen', 'NIP', 'NIDN', 'No. Telp', ''].map((title) => (
                  <Th key={title} fontSize={'md'} fontWeight={600} textTransform={'capitalize'}>
                    {title}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {filteredLecturers.slice(offset, offset + limit).map((lecturer) => (
                <Tr key={lecturer.id}>
                  <Td>
                    <HStack spacing={4}>
                      <Avatar name={lecturer.name} src={lecturer.profile_url} size={'md'}>
                        <AvatarBadge boxSize='1em' bg='green.500' />
                      </Avatar>
                      <Text>{lecturer.name}</Text>
                    </HStack>
                  </Td>
                  <Td>{lecturer.nip}</Td>
                  <Td>{lecturer.nidn}</Td>
                  <Td>{lecturer.phone_number}</Td>
                  <Td>
                    <Link href={`/dosen/${lecturer.id}`}>
                      <Center paddingX={4} paddingY={2} bg={'primary-blue'} color={'white'} borderRadius={'md'}>
                        Detail
                      </Center>
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <Flex flexDirection={{ base: 'column', lg: 'row' }} justifyContent={'space-between'} alignItems={'center'} marginTop={8} gap={{ base: 2, lg: 0 }}>
          <Text>
            Showing {offset + 1} to {offset + limit > filteredLecturers.length ? filteredLecturers.length : offset + limit} of {filteredLecturers.length} entries
          </Text>
          <LecturerTablePagination page={page} setPage={setPage} totalPage={totalPage} />
        </Flex>
      </>
    );
  }
}
