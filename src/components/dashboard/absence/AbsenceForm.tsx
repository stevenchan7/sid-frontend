'use client';

import { createAbsence, getLecturerAbsence, updateAbsence } from '@/api/absence.api';
import { useAbsenceStore } from '@/stores/absence.store';
import Absence from '@/types/absence.type';
import { Box, Button, Center, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, Skeleton, Text, useToast, VStack } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Field, FieldInputProps, Form, Formik, FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

export default function AbsenceForm() {
	const toast = useToast();
	const [absence, setAbsence] = useState<Absence | null>(null);
	const [showForm, setShowForm] = useState(false);
	const { setAbsenceHistory } = useAbsenceStore();
	const queryClient = useQueryClient();
	interface formValues {
		id: number;
		status: string;
		activity: string;
		location: string;
	}
	const formValidationSchema = Yup.object().shape({
		status: Yup.string().required('Required'),
		activity: Yup.string().required('Required'),
		location: Yup.string().required('Required'),
	});

	const { data, isPending } = useQuery({
		queryKey: ['absences'],
		queryFn: () => getLecturerAbsence(),
	});

	useEffect(() => {
		if (data) {
			setAbsenceHistory(data.absenceHistory);
			setAbsence(data.todayAbsence);
		}
	}, [data]);

	const createAbsenceMutation = useMutation({
		mutationFn: () => createAbsence(),
		onSuccess: () => {
			// Invalidate get absence query to get refetched
			queryClient.invalidateQueries({ queryKey: ['absences'] });

			return toast({
				title: 'Berhasil update kehadiran',
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

	const updateAbsenceMutation = useMutation({
		mutationFn: ({ id, status, activity, location }: formValues) => updateAbsence({ id, status, activity, location }),
		onSuccess: (data) => {
			setAbsence(data);
			setShowForm(false);
			return toast({
				title: 'Berhasil update kehadiran',
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

	function handleOnClick() {
		createAbsenceMutation.mutate();
	}

	return (
		<Box flexBasis={'50%'} w={'full'}>
			{isPending ? (
				<Skeleton height={'500px'} borderRadius={'lg'} />
			) : absence ? (
				showForm ? (
					<Box w={'full'} borderRadius={'lg'} padding={6} boxShadow={'lg'}>
						<VStack spacing={6} alignItems={'flex-start'}>
							<Heading as={'h2'} size={'lg'}>
								Ubah Status
							</Heading>
							<Box w={'full'}>
								<Formik
									initialValues={{ id: absence.id, status: absence.status || 'Mengajar', activity: absence.activity || '', location: absence.location || '' }}
									validationSchema={formValidationSchema}
									onSubmit={(values) => updateAbsenceMutation.mutate(values)}
								>
									{(props) => (
										<Form>
											<VStack alignItems={'flex-start'} spacing={6}>
												<Field name='status'>
													{({ field, form }: { field: FieldInputProps<string>; form: FormikProps<formValues> }) => (
														<FormControl isInvalid={!!(form.errors.status && form.touched.status)}>
															<FormLabel>Status</FormLabel>
															<HStack flexWrap={'wrap'} columnGap={4} rowGap={4}>
																{['Mengajar', 'Tidak Mengajar', 'Istirahat', 'Ijin', 'Sakit', 'Mengikuti Kegiatan'].map((status) => (
																	<Center
																		key={status}
																		onClick={() => form.setFieldValue('status', status)}
																		cursor={'pointer'}
																		py={2}
																		px={4}
																		borderRadius={'lg'}
																		bg={form.values.status === status ? 'primary-blue' : ''}
																		color={form.values.status === status ? 'white' : ''}
																		border={'1px'}
																		borderColor={form.values.status === status ? 'primary-blue' : ''}
																	>
																		{status}
																	</Center>
																))}
															</HStack>
															<FormErrorMessage>{form.errors.status}</FormErrorMessage>
														</FormControl>
													)}
												</Field>
												<Field name='activity'>
													{({ field, form }: { field: FieldInputProps<string>; form: FormikProps<formValues> }) => (
														<FormControl isInvalid={!!(form.errors.activity && form.touched.activity)}>
															<FormLabel>Kegiatan</FormLabel>
															<Input {...field} placeholder='Kegiatan' />
															<FormErrorMessage>{form.errors.activity}</FormErrorMessage>
														</FormControl>
													)}
												</Field>
												<Field name='location'>
													{({ field, form }: { field: FieldInputProps<string>; form: FormikProps<formValues> }) => (
														<FormControl isInvalid={!!(form.errors.location && form.touched.location)}>
															<FormLabel>Lokasi</FormLabel>
															<Input {...field} placeholder='Lokasi' />
															<FormErrorMessage>{form.errors.location}</FormErrorMessage>
														</FormControl>
													)}
												</Field>
												<HStack gap={4} w={'full'}>
													<Button type='button' onClick={() => setShowForm(false)} variant={'outline'} borderColor={'primary-blue'} margin={'auto'} w={'full'}>
														Batal
													</Button>
													<Button isDisabled={!props.dirty} isLoading={isPending} type='submit' margin={'auto'} w={'full'} bg={'primary-blue'} color={'white'}>
														Konfirmasi
													</Button>
												</HStack>
											</VStack>
										</Form>
									)}
								</Formik>
							</Box>
						</VStack>
					</Box>
				) : (
					<Box w={'full'} borderRadius={'lg'} padding={6} boxShadow={'lg'}>
						<VStack spacing={6} alignItems={'flex-start'}>
							<Heading as={'h2'} size={'lg'}>
								Status Kehadiran Saat Ini
							</Heading>
							<VStack alignItems={'flex-start'} spacing={6}>
								<VStack alignItems={'flex-start'}>
									<Text>Status</Text>
									<Text color={absence.status ? '' : 'red'}>{absence.status ? absence.status : 'Segera update'}</Text>
								</VStack>
								<VStack alignItems={'flex-start'}>
									<Text>Kegiatan</Text>
									<Text color={absence.activity ? '' : 'red'}>{absence.activity ? absence.activity : 'Segera update'}</Text>
								</VStack>
								<VStack alignItems={'flex-start'}>
									<Text>Lokasi</Text>
									<Text color={absence.location ? '' : 'red'}>{absence.location ? absence.location : 'Segera update'}</Text>
								</VStack>
								<VStack alignItems={'flex-start'}>
									<Text>Waktu</Text>
									<Text>08.00 - 15.00 WITA</Text>
								</VStack>
							</VStack>
							<Button onClick={() => setShowForm(true)} margin={'auto'} w={'full'} bg={'primary-blue'} color={'white'}>
								Ubah Status
							</Button>
						</VStack>
					</Box>
				)
			) : (
				<Box w={'full'} borderRadius={'lg'} padding={6} boxShadow={'lg'}>
					<VStack spacing={6} alignItems={'flex-start'}>
						<Heading as={'h2'} size={'lg'}>
							Belum ada absen hari ini
						</Heading>
						<Button onClick={handleOnClick} w={'full'} bg={'primary-blue'} color={'white'}>
							Buat absen hari ini
						</Button>
					</VStack>
				</Box>
			)}
		</Box>
	);
}
