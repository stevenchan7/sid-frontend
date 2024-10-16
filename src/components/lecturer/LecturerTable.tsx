import { Link } from '@chakra-ui/next-js';
import { Box, Center } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';

export default function LecturerTable() {
	return (
		<TableContainer>
			<Table variant='stripped' colorScheme='light-blue'>
				<Thead>
					<Tr>
						<Th>Nama Dosen</Th>
						<Th>NIP</Th>
						<Th>NIDN</Th>
						<Th>No. Telp</Th>
						<Th></Th>
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						<Td>Dr. Ir. I Ketut Gede Suhartana, S.Kom., M.Kom., IPM., ASEAN.Eng</Td>
						<Td>1984082920181113001</Td>
						<Td>0829088401</Td>
						<Td>08246076145</Td>
						<Td>
							<Link href='#'>
								<Center paddingX={4} paddingY={2} bg={'primary-blue'} color={'white'} borderRadius={'md'}>
									Detail
								</Center>
							</Link>
						</Td>
					</Tr>
					<Tr>
						<Td>Dr. Ir. I Ketut Gede Suhartana, S.Kom., M.Kom., IPM., ASEAN.Eng</Td>
						<Td>1984082920181113001</Td>
						<Td>0829088401</Td>
						<Td>08246076145</Td>
						<Td>
							<Link href='#'>
								<Center paddingX={4} paddingY={2} bg={'primary-blue'} color={'white'} borderRadius={'md'}>
									Detail
								</Center>
							</Link>
						</Td>
					</Tr>
				</Tbody>
			</Table>
		</TableContainer>
	);
}
