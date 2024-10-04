export default function handleError(error: any) {
	// Check if error is an Axios error (if error.response exists)
	if (error.response && error.response.data.error.message) {
		throw new Error(error.response.data.error.message);
	}

	// Check if the error is a standard JavaScript Error
	if (error instanceof Error) {
		throw new Error(error.message); // Fall back to the standard error message
	}

	throw new Error('Terjadi kesalahan');
}
