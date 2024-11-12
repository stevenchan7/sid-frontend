'use client';

import { createSchedule } from '@/api/schedule.api';
import LecturerSelect from '@/components/dashboard/schedule/LecturerSelect';
import LectureSelect from '@/components/dashboard/schedule/LectureSelect';
import { CreateScheduleFormValues } from '@/types/form.value';
import Lecturer from '@/types/lecturer.type';
import { Avatar, Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Input, Select, useToast, VStack } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { Field, FieldInputProps, Form, Formik, FormikProps } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

export default function CreateSchedulePage() {
	const toast = useToast();
	const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(null);
	const formValidationSchema = Yup.object().shape({
		lecturerId: Yup.number().required('Required'),
		lectureId: Yup.number().required('Required'),
		day: Yup.string().required('Required'),
		startTime: Yup.string().required('Required'),
		endTime: Yup.string().required('Required'),
		classif: Yup.string()
			.required('Required')
			.matches(/^[0-9]{2}[A-Za-z]{1}$/, 'Format kelas adalah eg. 22A'),
		location: Yup.string().required('Required'),
	});

	const mutation = useMutation({
		mutationFn: (formValues: CreateScheduleFormValues) => createSchedule(formValues),
		onSuccess: () => {
			return toast({
				title: 'Berhasil menambah jadwal mengajar',
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
		<Flex flexDirection={{ base: 'column', lg: 'row' }} justifyContent={'center'} gap={12}>
			<Box>
				<Avatar src={selectedLecturer?.profile_url} name={selectedLecturer?.name} size={'2xl'} boxSize={'10rem'} borderRadius={'lg'} />
			</Box>
			<Box flexBasis={'50%'}>
				<Formik
					initialValues={{ lecturerId: '', lectureId: '', day: '', startTime: '', endTime: '', classif: '', location: '' }}
					validationSchema={formValidationSchema}
					onSubmit={(values, { resetForm }) => mutation.mutate(values, { onSuccess: () => resetForm() })}
				>
					{(props) => (
						<Form>
							<VStack spacing={6}>
								<LecturerSelect setSelectedLecturer={setSelectedLecturer} />

								<LectureSelect />

								<HStack w={'full'}>
									<Field name='day'>
										{({ field, form }: { field: FieldInputProps<string>; form: FormikProps<CreateScheduleFormValues> }) => (
											<FormControl isInvalid={!!(form.errors.day && form.touched.day)}>
												<FormLabel>Hari</FormLabel>
												<Select {...field} onChange={(e) => form.setFieldValue('day', e.target.value)} value={field.value} placeholder='Pilih Hari'>
													{['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'].map((day) => (
														<option key={day} value={day}>
															{day.charAt(0).toUpperCase() + day.slice(1)}
														</option>
													))}
												</Select>
												<FormErrorMessage>{form.errors.day}</FormErrorMessage>
											</FormControl>
										)}
									</Field>

									<HStack alignItems={'flex-end'}>
										<Field name='startTime'>
											{({ field, form }: { field: FieldInputProps<string>; form: FormikProps<CreateScheduleFormValues> }) => (
												<FormControl isInvalid={!!(form.errors.startTime && form.touched.startTime)}>
													<FormLabel>Jam</FormLabel>
													<Input {...field} type='time' />
													<FormErrorMessage>{form.errors.startTime}</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<Field name='endTime'>
											{({ field, form }: { field: FieldInputProps<string>; form: FormikProps<CreateScheduleFormValues> }) => (
												<FormControl isInvalid={!!(form.errors.endTime && form.touched.endTime)}>
													<Input {...field} type='time' />
													<FormErrorMessage>{form.errors.endTime}</FormErrorMessage>
												</FormControl>
											)}
										</Field>
									</HStack>
								</HStack>

								<Field name='classif'>
									{({ field, form }: { field: FieldInputProps<string>; form: FormikProps<CreateScheduleFormValues> }) => (
										<FormControl isInvalid={!!(form.errors.classif && form.touched.classif)}>
											<FormLabel>Kelas</FormLabel>
											<Input
												{...field}
												value={field.value}
												onChange={(e) => {
													form.setFieldValue('classif', e.target.value.toUpperCase());
												}}
												placeholder='Kelas'
											/>
											<FormErrorMessage>{form.errors.classif}</FormErrorMessage>
										</FormControl>
									)}
								</Field>

								<Field name='location'>
									{({ field, form }: { field: FieldInputProps<string>; form: FormikProps<CreateScheduleFormValues> }) => (
										<FormControl isInvalid={!!(form.errors.location && form.touched.location)}>
											<FormLabel>Lokasi</FormLabel>
											<Input {...field} placeholder='Lokasi' />
											<FormErrorMessage>{form.errors.location}</FormErrorMessage>
										</FormControl>
									)}
								</Field>

								<Button isLoading={mutation.isPending} type='submit' margin={'auto'} w={'full'} bg={'primary-blue'} color={'white'}>
									Konfirmasi
								</Button>
							</VStack>
						</Form>
					)}
				</Formik>
			</Box>
		</Flex>
	);
}
