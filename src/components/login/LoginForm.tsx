'use client';

import { Box, Button, Checkbox, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, Switch, useToast } from '@chakra-ui/react';
import { Field, FieldInputProps, Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/api/auth.api';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
	const LoginSchema = Yup.object().shape({
		username: Yup.string().required('Required'),
		password: Yup.string().required('Required'),
	});
	const toast = useToast();
	const router = useRouter();
	const [isShow, setIsShow] = useState(false);

	const { mutate: loginMutate, isPending } = useMutation({
		mutationFn: (reqBody: { username: string; password: string; remember: boolean }) => login(reqBody),
		onSuccess: () => {
			router.push('/');

			return toast({
				title: 'Login Sukses',
				status: 'success',
				duration: 5000,
				position: 'top',
			});
		},
		onError: (error) => {
			return toast({
				title: 'Login Gagal',
				description: error.message,
				status: 'error',
				duration: 5000,
				position: 'top',
			});
		},
	});

	// const handleOnSubmit = async (values) => {
	//     try {
	//         const res = await signIn('credentials', {
	//             username: values.username,
	//             password: values.password,
	//             remember: values.remember,
	//             redirect: false
	//         })

	//         console.log(res);

	//         if (res.ok) {
	//             router.push('/')

	//             return toast({
	//                 title: 'Login Sukses',
	//                 status: 'success',
	//                 duration: 5000,
	//                 position: 'top'
	//             })
	//         }

	//         throw new Error('Invalid credentials')
	//     } catch (error) {
	//         console.error(error);
	//         if (error instanceof Error) {
	//             return toast({
	//                 title: 'Login Gagal',
	//                 description: error.message,
	//                 status: 'error',
	//                 duration: 5000,
	//                 position: 'top',
	//             })
	//         }
	//     }
	// }

	return (
		<Formik
			initialValues={{ username: '', password: '', remember: false }}
			validationSchema={LoginSchema}
			onSubmit={(values) => {
				loginMutate(values);
				// handleOnSubmit(values)
			}}
		>
			{(props) => (
				<Form>
					<Field name='username'>
						{({ field, form }: { field: FieldInputProps<string>; form: any }) => (
							<FormControl marginTop={10} isInvalid={form.errors.username && form.touched.username}>
								<FormLabel color={'primary-blue'} fontWeight={700}>
									Username
								</FormLabel>
								<Input {...field} placeholder='Username' bg={'blackAlpha.50'} height={'52px'} borderRadius={'xl'} />
								<FormErrorMessage>{form.errors.username}</FormErrorMessage>
							</FormControl>
						)}
					</Field>
					<Field name='password'>
						{({ field, form }: { field: FieldInputProps<string>; form: any }) => (
							<FormControl marginTop={4} isInvalid={form.errors.password && form.touched.password}>
								<FormLabel color={'primary-blue'} fontWeight={700}>
									Password
								</FormLabel>
								<InputGroup>
									<Input {...field} placeholder='Password' type={isShow ? 'text' : 'password'} bg={'blackAlpha.50'} height={'52px'} />
									<InputRightElement h={'full'} cursor={'pointer'} onClick={(e) => setIsShow(!isShow)}>
										{isShow ? <FaEye /> : <FaEyeSlash />}
									</InputRightElement>
								</InputGroup>
								<FormErrorMessage>{form.errors.password}</FormErrorMessage>
							</FormControl>
						)}
					</Field>
					<Field name='remember'>
						{({ field, form }: { field: FieldInputProps<any>; form: any }) => (
							<FormControl marginTop={4} display={'flex'} alignItems={'center'}>
								<Switch id='remember' {...field} />
								<FormLabel margin={0} marginLeft={2}>
									Ingat saya
								</FormLabel>
							</FormControl>
						)}
					</Field>

					<Button w={'full'} h={'58px'} mt={10} bg={'navy'} color={'white'} fontWeight={'bold'} fontSize={'20px'} isLoading={isPending} type='submit'>
						Masuk
					</Button>
				</Form>
			)}
		</Formik>
	);
}
