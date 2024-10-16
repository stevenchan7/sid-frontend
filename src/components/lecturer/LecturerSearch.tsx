import { HStack, Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { BiSearch } from 'react-icons/bi';

export default function LecturerSearch({ setSearch }: { setSearch: Dispatch<SetStateAction<string>> }) {
	function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
		setSearch(e.target.value);
	}

	return (
		<HStack>
			<InputGroup maxWidth={'md'} marginTop={5}>
				<InputLeftElement pointerEvents={'none'}>
					<Icon as={BiSearch} />
				</InputLeftElement>
				<Input onChange={(e) => handleOnChange(e)} type='search' placeholder='Cari berdasarkan nama ataup NIP'></Input>
			</InputGroup>
		</HStack>
	);
}
