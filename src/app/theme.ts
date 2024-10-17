const { extendTheme } = require('@chakra-ui/react');

const theme = extendTheme({
	colors: {
		'primary-blue': '#2279C9',
		'light-blue': '#ECF5FF',
		navy: '#1A365D',
		table: {
			'100': '#ECF5FF',
		},
	},
});

export default theme;
