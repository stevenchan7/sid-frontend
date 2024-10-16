'use client';

import LecturerSearch from '@/components/lecturer/LecturerSearch';
import LecturerTable from '@/components/lecturer/LecturerTable';
import { Box, Container, Heading } from '@chakra-ui/react';
import { useState } from 'react';

export default function LecturerPage() {
	const [search, setSearch] = useState('');

	return (
		<Container maxWidth={'container.xl'} marginY={20}>
			<Box>
				<Heading as={'h1'}>Daftar Dosen Informatika</Heading>
				<LecturerSearch setSearch={setSearch} />
				<LecturerTable />
			</Box>
		</Container>
	);
}
