import { logout } from '@/api/auth.api';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Link, MenuItem, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function Logout() {
	const router = useRouter();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef<HTMLButtonElement>(null);

	const handleOnClick = async () => {
		try {
			await logout();
			onClose();
			router.replace('/login');
			return toast({
				title: 'Logout Sukses',
				status: 'success',
				duration: 5000,
				position: 'top',
			});
		} catch (error: any) {
			return toast({
				title: 'Login Gagal',
				description: error.message,
				status: 'error',
				duration: 5000,
				position: 'top',
			});
		}
	};

	return (
		<>
			<MenuItem onClick={onOpen}>Log Out</MenuItem>
			<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							Log Out
						</AlertDialogHeader>

						<AlertDialogBody>Apakah yakin ingin keluar?</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Batal
							</Button>
							<Button colorScheme='red' onClick={handleOnClick} ml={3}>
								Log Out
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
}
