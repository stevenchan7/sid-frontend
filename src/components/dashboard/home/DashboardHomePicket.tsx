import { getPickets } from '@/api/picket.api';
import { usePicketStore } from '@/stores/picket.store';
import Picket from '@/types/picket.type';
import { Box, Center, FormControl, Heading, HStack, Link, Select, Skeleton, Text, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import PicketCard from '../picket/PicketCard';

export default function DashboardHomePicket() {
	const days = ['senin', 'selasa', 'rabu', 'kamis', 'jumat'];
	const [selectedDay, setSelectedDay] = useState('senin');
	const { pickets, setPickets } = usePicketStore();
	const [picketsByDay, setPicketsByDay] = useState<Picket[] | null>(null);

	function filterPicketsByDay(day: string) {
		return pickets.filter((picket) => picket.day === day);
	}

	const { data, isPending } = useQuery({
		queryKey: ['pickets'],
		queryFn: () => getPickets(),
	});

	useEffect(() => {
		if (data) {
			setPickets(data);
		}
	}, [data]);

	useEffect(() => {
		if (pickets) {
			setPicketsByDay(filterPicketsByDay(selectedDay));
		}
	}, [pickets, selectedDay]);

	return (
		<Box flexBasis={'50%'} w={'full'} padding={8} borderRadius={'lg'} boxShadow={'lg'}>
			<HStack justifyContent={'space-between'}>
				<Heading as={'h2'} size={'md'}>
					Piket
				</Heading>

				<HStack>
					<Select onChange={(e) => setSelectedDay(e.target.value)} placeholder='Pilih Hari'>
						{days.map((day) => (
							<option key={day} value={day}>
								{day.charAt(0).toUpperCase() + day.slice(1)}
							</option>
						))}
					</Select>
				</HStack>
			</HStack>

			<Box marginTop={4}>
				{isPending ? (
					<VStack gap={4}>
						{Array.from({ length: 3 }).map((_, index) => (
							<Skeleton key={index} w={'full'} h={'80px'} />
						))}
					</VStack>
				) : picketsByDay ? (
					<VStack gap={4}>
						{picketsByDay.map((picket) => (
							<PicketCard picket={picket} key={picket.id} />
						))}
					</VStack>
				) : (
					<Text>Tidak ada jadwal piket</Text>
				)}
			</Box>
		</Box>
	);
}
