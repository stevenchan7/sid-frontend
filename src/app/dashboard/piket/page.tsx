'use client';

import { getPickets } from '@/api/picket.api';
import PicketCard from '@/components/dashboard/picket/PicketCard';
import { usePicketStore } from '@/stores/picket.store';
import Picket from '@/types/picket.type';
import { Box, Center, Flex, HStack, Link, Skeleton, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

export default function PicketPage() {
	interface GroupedPickets {
		senin: Picket[];
		selasa: Picket[];
		rabu: Picket[];
		kamis: Picket[];
		jumat: Picket[];
	}
	const days: Array<keyof GroupedPickets> = ['senin', 'selasa', 'rabu', 'kamis', 'jumat'];
	const { pickets, setPickets } = usePicketStore();
	const [groupedPickets, setGroupedPickets] = useState<GroupedPickets | null>(null);

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
		const groupedPickets: GroupedPickets = { senin: [], selasa: [], rabu: [], kamis: [], jumat: [] };
		pickets.map((picket) => {
			groupedPickets[picket.day].push(picket);
		});

		setGroupedPickets(groupedPickets);
	}, [pickets]);

	return (
		<Box w='full'>
			<HStack justifyContent={'flex-end'}>
				<Link href='/dashboard/piket/tambah'>
					<Center paddingX={4} paddingY={2} bg={'primary-blue'} color={'white'} borderRadius={'md'}>
						Tambah
					</Center>
				</Link>
			</HStack>

			<Tabs w={'full'}>
				<TabList>
					{days.map((day, index) => (
						<Tab key={index}>{day.charAt(0).toUpperCase() + day.slice(1)}</Tab>
					))}
				</TabList>
				<TabPanels>
					{days.map((day) => (
						<TabPanel key={day}>
							<VStack spacing={4}>
								{isPending
									? Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} w={'full'} h={'72px'} />)
									: groupedPickets && groupedPickets[day].map((picket) => <PicketCard key={picket.id} picket={picket} />)}
							</VStack>
						</TabPanel>
					))}
				</TabPanels>
			</Tabs>
		</Box>
	);
}
