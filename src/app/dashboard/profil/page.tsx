'use client';

import { getLecturerById, updateLecturer } from '@/api/lecturer.api';
import useAuth from '@/hooks/useAuth';
import Lecturer from '@/types/lecturer.type';
import { Avatar, Box, Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, useToast, VStack } from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Formik, Form, Field, FieldInputProps, FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

export default function DashboardProfilePage() {
  const { user } = useAuth();
  const toast = useToast();
  const [lecturer, setLecturer] = useState<null | Lecturer>(null);
  const formValidationSchema = Yup.object().shape({
    avatar: Yup.mixed<File>()
      .test('fileType', 'Format file tidak sesuai', (file) => {
        if (file) {
          if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
            return false;
          }
        }
        return true;
      })
      .test('fileSize', 'Maks 1 mb setiap file', (file) => {
        if (file) {
          if (file.size > 512000) {
            return false;
          }
        }
        return true;
      }),
    id: Yup.number().required('Required'),
    name: Yup.string().required('Required'),
    phoneNumber: Yup.string().matches(/^\d+$/, 'Harus angka').max(12, 'Maks 12 digit').required('Required'),
    address: Yup.string().required('Required'),
  });
  interface formValues {
    avatar: string;
    id: string;
    name: string;
    phoneNumber: string;
    address: string;
  }

  const { data } = useQuery({
    queryKey: ['lecturers', { id: user && user.id }],
    queryFn: () => user && getLecturerById(user.id),
  });

  useEffect(() => {
    if (data) {
      setLecturer(data);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: () => updateLecturer(),
  });

  if (lecturer)
    return (
      <Box w={'full'}>
        <Box paddingX={{ base: 10, lg: 20 }} paddingY={{ base: 3, lg: 6 }} bg={'#F8F9FA'}>
          <Heading size={'2xl'}>Profil</Heading>
        </Box>
        <Container maxW='container.xl' marginTop={8}>
          <Flex flexDirection={{ base: 'column', lg: 'row' }} justifyContent={'center'} gap={12}>
            <Box>
              <Avatar src={lecturer.profile_url} name={lecturer.name} size={'2xl'} boxSize={'10rem'} borderRadius={'lg'} />
            </Box>
            <Box flexBasis={'50%'}>
              <Formik
                initialValues={{ avatar: '', id: lecturer.id, name: lecturer.name, phoneNumber: lecturer.phone_number, address: lecturer.address }}
                validationSchema={formValidationSchema}
                onSubmit={(values) => console.log(values)}
              >
                {(props) => (
                  <Form>
                    <Field name='avatar'>
                      {({ form }: { form: FormikProps<formValues> }) => (
                        <FormControl isInvalid={!!(form.errors.avatar && form.touched.avatar)}>
                          <Input
                            type='file'
                            accept='image/png, image/jpeg'
                            onChange={(e) => {
                              const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
                              form.setFieldValue('avatar', file);
                            }}
                          />
                          <FormErrorMessage>{form.errors.avatar}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <VStack spacing={6}>
                      <Field name='name'>
                        {({ field, form }: { field: FieldInputProps<string>; form: FormikProps<formValues> }) => (
                          <FormControl isInvalid={!!(form.errors.name && form.touched.name)}>
                            <FormLabel>Nama Lengkap</FormLabel>
                            <Input {...field} placeholder='Nama Lengkap' />
                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <HStack w={'full'}>
                        <FormControl>
                          <FormLabel>NIP</FormLabel>
                          <Input value={'1234567'} disabled />
                        </FormControl>

                        <FormControl>
                          <FormLabel>NIDN</FormLabel>
                          <Input value={'1234567'} disabled />
                        </FormControl>
                      </HStack>

                      <HStack w={'full'}>
                        <FormControl>
                          <FormLabel>Email</FormLabel>
                          <Input value={'email@unud.ac.id'} disabled />
                        </FormControl>

                        <Field name='phoneNumber'>
                          {({ field, form }: { field: FieldInputProps<string>; form: FormikProps<formValues> }) => (
                            <FormControl isInvalid={!!(form.errors.phoneNumber && form.touched.phoneNumber)}>
                              <FormLabel>Telepon</FormLabel>
                              <Input {...field} placeholder='Telepon' />
                              <FormErrorMessage>{form.errors.phoneNumber}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </HStack>

                      <Field name='address'>
                        {({ field, form }: { field: FieldInputProps<string>; form: FormikProps<formValues> }) => (
                          <FormControl isInvalid={!!(form.errors.address && form.touched.address)}>
                            <FormLabel>Alamat</FormLabel>
                            <Input {...field} placeholder='Alamat' />
                            <FormErrorMessage>{form.errors.address}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Button isLoading={mutation.isPending} type='submit' margin={'auto'} w={'full'} bg={'primary-blue'} color={'white'}>
                        Simpan
                      </Button>
                    </VStack>
                  </Form>
                )}
              </Formik>
            </Box>
          </Flex>
        </Container>
      </Box>
    );
}
