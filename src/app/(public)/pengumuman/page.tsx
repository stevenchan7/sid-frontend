import AnnouncementBox from '@/components/announcement/AnnouncementBox';
import AnnouncementList from '@/components/announcement/AnnouncementList';
import AnnouncementSearch from '@/components/announcement/AnnouncementSearch';
import announcement from '@/types/announcement.type';
import { Box, Container, Flex, Heading, VStack } from '@chakra-ui/react';

export default function AnnouncementPage() {
	const announcement: announcement = {
		id: '1',
		title: 'Rapat dosen informatika',
		content:
			'Selamat siang bapak/ibu dosen sekalian,\n\nSaya ingin memberitahukan bahwa rapat dosen hari ini akan dilaksanakan.\nSemoga report nilai sementara ini menjadi evaluasi dan membuat kamu lebih termotivasi untuk belajar ke chapter selanjutnya ya!\nSincerely,',
		priority: 'normal',
		announcement_medias: [{ media_url: 'media.pdf' }, { media_url: 'media.pdf' }],
		lecturer: {
			name: 'Dr. Ir. I Ketut Gede Suhartana, S.Kom., M.Kom., IPM., ASEAN.Eng',
			profile_url: 'profile.jpg',
		},
		createdAt: '',
	};
	return (
		<Container maxWidth={'container.xl'} marginY={20}>
			<Box>
				<Heading as={'h1'}>Pengumuman</Heading>
				<AnnouncementSearch />
				<Flex flexDirection={{ base: 'column', lg: 'row' }} gap={8} marginTop={5}>
					<AnnouncementList />
					<AnnouncementBox />
				</Flex>
			</Box>
		</Container>
	);
}
