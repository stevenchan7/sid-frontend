'use client';

import { createPicket } from '@/api/picket.api';
import LecturerSelect from '@/components/dashboard/schedule/LecturerSelect';
import { CreateScheduleFormValues } from '@/types/form.value';
import Lecturer from '@/types/lecturer.type';
import { Avatar, Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Select, useToast, VStack } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { Field, FieldInputProps, Form, Formik, FormikProps } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

export default function CreatePicketPage() {
	const toast = useToast();
	const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(null);
	const formValidationSchema = Yup.object().shape({
		lecturerId: Yup.number().required('Required'),
		day: Yup.string().oneOf(['senin', 'selasa', 'rabu', 'kamis', 'jumat'], 'Hari invalid').required('Required'),
		location: Yup.string().required('Required'),
	});
	interface formValues {
		lecturerId: string;
		day: string;
		location: string;
	}

	const mutation = useMutation({
		mutationFn: (formValues: formValues) => createPicket(formValues),
		onSuccess: () => {
			return toast({
				title: 'Berhasil menambah jadwal piket',
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
					initialValues={{ lecturerId: '', day: 'senin', location: '' }}
					validationSchema={formValidationSchema}
					onSubmit={(values, { resetForm }) => mutation.mutate(values, { onSuccess: () => resetForm() })}
				>
					{(props) => (
						<Form>
							<VStack spacing={6}>
								<LecturerSelect setSelectedLecturer={setSelectedLecturer} />

								<Field name='day'>
									{({ field, form }: { field: FieldInputProps<string>; form: FormikProps<CreateScheduleFormValues> }) => (
										<FormControl isInvalid={!!(form.errors.day && form.touched.day)}>
											<FormLabel>Hari</FormLabel>
											<Select {...field} onChange={(e) => form.setFieldValue('day', e.target.value)} value={field.value} placeholder='Pilih Hari'>
												{['senin', 'selasa', 'rabu', 'kamis', 'jumat'].map((day) => (
													<option key={day} value={day}>
														{day.charAt(0).toUpperCase() + day.slice(1)}
													</option>
												))}
											</Select>
											<FormErrorMessage>{form.errors.day}</FormErrorMessage>
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
