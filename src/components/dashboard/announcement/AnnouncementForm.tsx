'use client';

import { createAnnouncement } from '@/api/announcement.api';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, Text, Textarea, useToast, VStack } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Field, FieldInputProps, Form, Formik, FormikProps } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';
import * as Yup from 'yup';

function RadioCard({ value, setFieldValue, selected }: { value: string; setFieldValue: any; selected: boolean }) {
	return (
		<Box
			onClick={() => setFieldValue('priority', value)}
			cursor={'pointer'}
			bg={selected ? 'primary-blue' : 'white'}
			color={selected ? 'white' : 'blackAlpha.500'}
			border={selected ? '' : '1px'}
			borderColor={selected ? '' : 'blackAlpha.500'}
			paddingX={2}
			paddingY={1}
			borderRadius={'lg'}
		>
			<Text>{value}</Text>
		</Box>
	);
}

export default function AnnouncementForm() {
	const createAnnouncementSchema = Yup.object().shape({
		title: Yup.string().required('Required'),
		priority: Yup.string().required('Required'),
		content: Yup.string().required('Required'),
		medias: Yup.mixed<FileList>()
			.test('fileType', 'Format file harus .pdf', (files) => {
				if (files) {
					for (let i = 0; i < files.length; i++) {
						if (files[i].type !== 'application/pdf') {
							return false;
						}
					}
				}
				return true;
			})
			.test('fileSize', 'Maks 1 mb setiap file', (files) => {
				if (files) {
					for (let i = 0; i < files.length; i++) {
						if (files[i].size > 512000) {
							return false;
						}
					}
				}
				return true;
			}),
	});
	const options = ['penting', 'normal'];
	const toast = useToast();
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	interface formValues {
		title: string;
		priority: string;
		content: string;
		medias: [];
	}
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (payload: { title: string; content: string; priority: string; medias: any[] }): Promise<string | any> => createAnnouncement(payload),
		onSuccess: (data) => {
			// Invalidate announcement queries
			queryClient.invalidateQueries({ queryKey: ['announcements'] });

			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}

			return toast({
				title: 'Sukses',
				description: data,
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
		<Box flexBasis={'40%'} padding={8} borderRadius={'lg'} boxShadow={'lg'}>
			<Heading as={'h2'} size={'lg'}>
				Buat Pengumuman
			</Heading>

			<Box marginTop={8}>
				<Formik
					initialValues={{ title: '', priority: 'penting', content: '', medias: [] }}
					validationSchema={createAnnouncementSchema}
					onSubmit={(values, { resetForm }) => {
						mutation.mutate(values, {
							onSuccess: () => {
								resetForm();
							},
						});
					}}
				>
					{(props) => (
						<Form>
							<VStack spacing={4} alignItems={'flex-start'}>
								<Field name='title'>
									{({ field, form }: { field: FieldInputProps<string>; form: FormikProps<formValues> }) => (
										<FormControl isInvalid={!!(form.errors.title && form.touched.title)}>
											<FormLabel>Judul Pengumuman</FormLabel>
											<Input {...field} placeholder='Judul pengumuman' />
											<FormErrorMessage>{form.errors.title}</FormErrorMessage>
										</FormControl>
									)}
								</Field>

								<Field name='priority'>
									{({ form }: { form: FormikProps<formValues> }) => (
										<FormControl isInvalid={!!(form.errors.priority && form.touched.priority)}>
											<FormLabel>Prioritas</FormLabel>
											<HStack>
												{options.map((value) => (
													<RadioCard key={value} value={value} setFieldValue={form.setFieldValue} selected={form.values.priority === value} />
												))}
											</HStack>
											<FormErrorMessage>{form.errors.priority}</FormErrorMessage>
										</FormControl>
									)}
								</Field>

								<Field name='content'>
									{({ field, form }: { field: FieldInputProps<string>; form: FormikProps<formValues> }) => (
										<FormControl isInvalid={!!(form.errors.content && form.touched.content)}>
											<FormLabel>Isi Pengumuman</FormLabel>
											<Textarea {...field} placeholder='Isi pengumuman' rows={10} />
											<FormErrorMessage>{form.errors.content}</FormErrorMessage>
										</FormControl>
									)}
								</Field>

								<Field name='medias'>
									{({ form }: { form: FormikProps<formValues> }) => (
										<FormControl isInvalid={!!(form.errors.medias && form.touched.medias)}>
											<FormLabel>Dokumen Pengumuman</FormLabel>
											<Input
												ref={fileInputRef}
												onChange={(e) => form.setFieldValue('medias', e.target.files)}
												type='file'
												accept='application/pdf'
												multiple
												border={'none'}
												borderRadius={0}
												padding={0}
												_invalid={{ boxShadow: 'none', border: 'none' }}
											/>
											<FormErrorMessage>{form.errors.medias}</FormErrorMessage>
										</FormControl>
									)}
								</Field>

								<Button isDisabled={!props.dirty} isLoading={mutation.isPending} type='submit' width={'full'} bg={'primary-blue'} color={'white'}>
									Buat Pengumuman
								</Button>
							</VStack>
						</Form>
					)}
				</Formik>
			</Box>
		</Box>
	);
}
