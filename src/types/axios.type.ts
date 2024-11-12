export interface ApiResponseDataType<T = any> {
	success: boolean;
	data: T;
}
