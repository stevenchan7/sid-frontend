import { Box, Divider, Text } from '@chakra-ui/react';

export default function PublicFooter() {
	return (
		<Box height={'116px'} paddingX={8} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} bg={'navy'} gap={5}>
			<Divider maxWidth={{ lg: '1088px' }} marginTop={5} />
			<Text color={'white'} align={'center'}>
				&copy; Pusat Informasi Informatika All Rights Reserved. Website by SIC 2023.
			</Text>
		</Box>
	);
}
