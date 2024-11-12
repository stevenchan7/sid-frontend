'use client';

import { getLectures } from '@/api/lecture.api';
import { getSchedules } from '@/api/schedule.api';
import LecturerTablePagination from '@/components/lecturer/LecturerTablePagination';
import { useLectureStore } from '@/stores/lecture.store';
import { useScheduleStore } from '@/stores/schedule.store';
import Lecture from '@/types/lecture.type';
import Schedule from '@/types/schedule.type';
import { Link } from '@chakra-ui/next-js';
import { Box, Center, Flex, Heading, HStack, Select, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

function LectureSelectFilter({ setLecture }: { setLecture: Dispatch<SetStateAction<string>> }) {
	const { lectures, setLectures } = useLectureStore();

	const { data, isPending } = useQuery({
		queryKey: ['lectures'],
		queryFn: () => getLectures(),
	});

	useEffect(() => {
		if (data) {
			setLectures(data);
		}
	}, [data]);

	return (
		<Select onChange={(e) => setLecture(e.target.value)} placeholder='Filter Mata Kuliah'>
			{lectures.map((lecture) => (
				<option key={lecture.id} value={lecture.name}>
					{lecture.name}
				</option>
			))}
		</Select>
	);
}

export default function DashboardSchedule() {
	const { schedules, setSchedules } = useScheduleStore();
	const [page, setPage] = useState(1);
	const limit = 20;
	const offset = (page - 1) * limit;
	const totalPage = Math.ceil(schedules.length / limit);
	const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
	const [classif, setClassif] = useState('');
	const [lecture, setLecture] = useState('');

	const { data, isPending } = useQuery({
		queryKey: ['schedules'],
		queryFn: () => getSchedules(),
	});

	function filterSchedule(classif: string, lecture: string) {
		const filtered = schedules.filter((schedule) => {
			if (classif && lecture) {
				// Filter by both classif and lecture
				return schedule.classif === classif && schedule.lecture.name === lecture;
			} else if (classif) {
				// Filter by classif only
				return schedule.classif === classif;
			} else if (lecture) {
				// Filter by lecture only
				return schedule.lecture.name === lecture;
			}
			// No filter applied
			return true;
		});

		setFilteredSchedules(filtered);
	}

	useEffect(() => {
		if (data) {
			setSchedules(data);
			setFilteredSchedules(data);
		}
	}, [data]);

	useEffect(() => {
		filterSchedule(classif, lecture);
	}, [classif, lecture]);

	return (
		<Box as='section'>
			<Flex flexDirection='row' as='header'>
				<HStack>
					<Select onChange={(e) => setClassif(e.target.value)} placeholder='Filter Kelas'>
						{Array.from(new Set(schedules.map((schedule) => schedule.classif)))
							.sort()
							.map((classif) => (
								<option key={classif} value={classif}>
									{classif}
								</option>
							))}
					</Select>
					<LectureSelectFilter setLecture={setLecture} />
				</HStack>
				<Link href='/dashboard/jadwal/tambah' marginLeft='auto'>
					<Center paddingX={4} paddingY={2} bg={'primary-blue'} color={'white'} borderRadius={'md'}>
						Tambah
					</Center>
				</Link>
			</Flex>

			<TableContainer marginTop={8}>
				<Table variant='striped' colorScheme='table'>
					<Thead>
						<Tr>
							{['Mata Kuliah', 'Nama Dosen', 'Hari', 'Waktu Perkuliahan', 'Kelas', 'Lokasi'].map((title) => (
								<Th key={title}>
									<Text fontFamily={'Inter, sans-serif'} fontSize={'md'} fontWeight={600} textTransform={'capitalize'}>
										{title}
									</Text>
								</Th>
							))}
						</Tr>
					</Thead>
					<Tbody>
						{filteredSchedules.slice(offset, offset + limit).map((schedule, index) => (
							<Tr key={index}>
								<Td>{schedule.lecture.name}</Td>
								<Td>{schedule.lecturer.name}</Td>
								<Td textTransform='capitalize'>{schedule.day}</Td>
								<Td>
									{schedule.start_time.slice(0, 5)} - {schedule.end_time.slice(0, 5)}
								</Td>
								<Td>{schedule.classif}</Td>
								<Td>{schedule.location}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>

			<Flex flexDirection={{ base: 'column', lg: 'row' }} justifyContent={'space-between'} alignItems={'center'} marginTop={8} gap={{ base: 2, lg: 0 }}>
				<Text>
					Showing {offset + 1} to {offset + limit > filteredSchedules.length ? filteredSchedules.length : offset + limit} of {filteredSchedules.length} entries
				</Text>
				<LecturerTablePagination page={page} setPage={setPage} totalPage={totalPage} />
			</Flex>
		</Box>
	);
}
