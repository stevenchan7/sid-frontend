'use client';

import { useAnnouncementStore } from '@/stores/announcement.store';
import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { BiSearch } from 'react-icons/bi';

export default function AnnouncementSearch() {
	const setSearch = useAnnouncementStore((state) => state.setSearch);

	function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
		setSearch(e.target.value);
	}

	return (
		<InputGroup maxWidth={'md'} marginTop={5}>
			<InputLeftElement pointerEvents={'none'}>
				<Icon as={BiSearch} />
			</InputLeftElement>
			<Input onChange={(e) => handleOnChange(e)} type='search'></Input>
		</InputGroup>
	);
}
