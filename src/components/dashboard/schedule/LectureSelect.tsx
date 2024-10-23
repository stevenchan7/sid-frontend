import { getLectures } from '@/api/lecture.api';
import { useLectureStore } from '@/stores/lecture.store';
import { CreateScheduleFormValues } from '@/types/form.value';
import { FormControl, FormLabel, Select, FormErrorMessage } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Field, FieldInputProps, FormikProps } from 'formik';
import { useEffect } from 'react';

export default function LectureSelect() {
	const { lectures, setLectures } = useLectureStore();

	const { data, isPending } = useQuery({
		queryKey: ['lectures'],
		queryFn: () => getLectures(),
	});

	useEffect(() => {
		if (data) {
			setLectures(data);
		}
	}, [data]);

	return (
		<Field name='lectureId'>
			{({ field, form }: { field: FieldInputProps<string>; form: FormikProps<CreateScheduleFormValues> }) => (
				<FormControl isInvalid={!!(form.errors.lectureId && form.touched.lectureId)}>
					<FormLabel>Mata Kuliah</FormLabel>
					<Select {...field} onChange={(e) => form.setFieldValue('lectureId', e.target.value)} value={field.value} placeholder='Pilih Mata Kuliah'>
						{lectures.map((lecture) => (
							<option key={lecture.id} value={lecture.id}>
								{lecture.name}
							</option>
						))}
					</Select>
					<FormErrorMessage>{form.errors.lectureId}</FormErrorMessage>
				</FormControl>
			)}
		</Field>
	);
}
