export default (baseRoute = '', route = '') => {
	return (
		`/${baseRoute}/${route}`
			.replace(new RegExp('\/+', 'g'), '/')
			.replace(new RegExp('^.*?|\/$', 'g'), '')
	);
};
