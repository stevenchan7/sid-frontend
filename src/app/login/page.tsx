import { Box, Container, Flex, Heading, Image } from '@chakra-ui/react';
import LoginForm from '@/components/login/LoginForm';

export default function Login() {
	return (
		<Box w={'100vw'} h={'100vh'} bgGradient={'linear(to-b, rgba(119, 196, 238, 0.5), rgba(99, 168, 231, 0.5))'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
			<Container maxW={'container.xl'}>
				<Flex flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
					<Box display={{ base: 'none', lg: 'block' }} flexBasis={'50%'} paddingX={4} marginRight={16}>
						<Image src={'/assets/login.png'} alt='login' w={'full'} />
					</Box>
					<Box flexBasis={{ base: '90%', md: '70%', lg: '50%' }}>
						<Box bg={'white'} h={'700px'} display={'flex'} alignItems={'center'} borderRadius={'xl'} boxShadow={'lg'}>
							<Box m={'auto'} w={'full'} maxW={'82%'}>
								<Heading color={'navy'} textAlign={'center'} fontWeight={'black'} fontSize={'24px'}>
									Pusat Informasi Informatika
								</Heading>
								<Heading color={'navy'} marginTop={4} textAlign={'center'} fontWeight={'black'} fontSize={'24px'}>
									Masuk
								</Heading>
								<LoginForm />
							</Box>
						</Box>
					</Box>
				</Flex>
			</Container>
		</Box>
	);
}
