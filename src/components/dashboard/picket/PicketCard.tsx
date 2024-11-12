import { deletePicket } from '@/api/picket.api';
import Picket from '@/types/picket.type';
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Avatar,
	AvatarBadge,
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	HStack,
	Input,
	Text,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Field, FieldInputProps, Form, Formik, FormikProps } from 'formik';
import { usePathname } from 'next/navigation';
import React, { useRef } from 'react';
import { MdOutlineLocationOn } from 'react-icons/md';

export default function PicketCard({ picket }: { picket: Picket }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef<HTMLButtonElement>(null);
	const toast = useToast();
	const queryClient = useQueryClient();
	const pathname = usePathname();

	const mutation = useMutation({
		mutationFn: ({ id }: { id: string }) => deletePicket({ id }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['pickets'],
			});

			return toast({
				title: 'Berhasil menghapus jadwal piket',
				status: 'success',
				duration: 5000,
				position: 'top',
			});
		},
		onError: (error) => {
			return toast({
				title: 'Gagal',
				description: error.message,
				status: 'error',
				duration: 5000,
				position: 'top',
			});
		},
	});

	return (
		<Box w={'full'} borderRadius={'lg'} boxShadow={'base'} p={4} position={'relative'}>
			<HStack spacing={4}>
				<Avatar name={picket.lecturer.name} src={picket.lecturer.profile_url}>
					<AvatarBadge boxSize='1em' bg='green.500' />
				</Avatar>

				<Box>
					<Text fontWeight={'bold'}>{picket.lecturer.name}</Text>
					<HStack>
						<MdOutlineLocationOn />
						<Text fontSize={'sm'}>{picket.location}</Text>
					</HStack>
				</Box>
			</HStack>

			{pathname === '/dashboard/piket' && (
				<Button onClick={onOpen} cursor={'pointer'} position={'absolute'} right={0} top={0} bottom={0} w={'5rem'} h={'full'} colorScheme={'red'} borderStartRadius={0} borderEndRadius={'lg'}>
					<Text color={'white'}>Hapus</Text>
				</Button>
			)}

			<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							Hapus Jadwal Piket
						</AlertDialogHeader>

						<AlertDialogBody>Apa anda yakin ingin menghapus jadwal piket?</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Batal
							</Button>
							<Formik initialValues={{ id: String(picket.id) }} onSubmit={(values) => mutation.mutate(values)}>
								{(props) => (
									<Form>
										<Button type='submit' onClick={onClose} colorScheme='red' ml={3}>
											Hapus
										</Button>
									</Form>
								)}
							</Formik>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</Box>
	);
}
