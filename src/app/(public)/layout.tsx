import { Box, Flex } from '@chakra-ui/react';
import PublicNavbar from '@/components/layouts/PublicNavbar';
import PublicFooter from '@/components/layouts/PublicFooter';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
	return (
		<Flex flexDirection={'column'} minHeight={'100vh'}>
			<PublicNavbar />
			<Box flex={'1'} display={'flex'} justifyContent={'center'} alignItems={'flex-start'}>
				{children}
			</Box>
			<PublicFooter />
		</Flex>
	);
}
