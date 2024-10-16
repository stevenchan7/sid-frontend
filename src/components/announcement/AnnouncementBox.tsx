'use client';

import { useAnnouncementStore } from '@/stores/announcement.store';
import announcement from '@/types/announcement.type';
import { API_BASE_URL } from '@/utils/constant';
import { Link } from '@chakra-ui/next-js';
import { Avatar, Badge, Box, Divider, Flex, Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { BiFile } from 'react-icons/bi';

export default function AnnouncementBox() {
	const announcement = useAnnouncementStore((state) => state.selectedAnnouncement);

	useEffect(() => {
		console.log(announcement);
	}, []);

	return (
		<Box flexBasis={'50%'}>
			<Box w={'full'} h={'full'} bg={'white'} borderRadius={'lg'} boxShadow={'base'} p={8}>
				{announcement ? (
					<Box>
						<HStack flexDirection={'row'}>
							<HStack flexGrow={1}>
								<Avatar size={'md'} name='suhartana' src='' />
								<Text fontWeight={600}>{announcement.lecturer.name}</Text>
							</HStack>
							<VStack>
								<Text fontSize={'xs'}>
									{new Intl.DateTimeFormat('id-ID', {
										day: 'numeric',
										month: 'long',
										year: 'numeric',
									}).format(new Date(announcement.createdAt))}
								</Text>
								{announcement.priority === 'penting' ? (
									<Badge variant={'solid'} colorScheme={'red'} fontSize={'2xs'}>
										Penting
									</Badge>
								) : (
									<Badge variant={'solid'} colorScheme={'green'} fontSize={'xs'}>
										Normal
									</Badge>
								)}
							</VStack>
						</HStack>
						<Divider marginTop={3} />
						<Text marginTop={3}>{announcement.content}</Text>
						<Box marginTop={3}>
							{announcement.announcement_medias.map((media, index) => (
								<HStack key={index}>
									<Icon as={BiFile} />
									<Link href={API_BASE_URL + media.media_url}>media {index + 1}</Link>
								</HStack>
							))}
						</Box>
					</Box>
				) : (
					<Text textAlign={'center'}>Pilih Pengumuman</Text>
				)}
			</Box>
		</Box>
	);
}
