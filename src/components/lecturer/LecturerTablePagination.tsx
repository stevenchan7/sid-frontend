import { Box, Button, Center, HStack, Square } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

export default function LecturerTablePagination({ totalPage, page, setPage }: { totalPage: number; page: number; setPage: Dispatch<SetStateAction<number>> }) {
	return (
		<Box>
			<HStack>
				<Button isDisabled={page === 1} onClick={() => setPage(page - 1)}>
					Previous
				</Button>
				<Box>
					<HStack>
						{Array.from({ length: totalPage }).map((_, index) => (
							<Square
								key={index}
								onClick={() => setPage(index + 1)}
								cursor={'pointer'}
								size={'2.5rem'}
								bg={page === index + 1 ? 'primary-blue' : 'white'}
								color={page === index + 1 ? 'white' : ''}
								borderRadius={'md'}
							>
								{index + 1}
							</Square>
						))}
					</HStack>
				</Box>
				<Button isDisabled={page === totalPage} onClick={() => setPage(page + 1)}>
					Next
				</Button>
			</HStack>
		</Box>
	);
}
