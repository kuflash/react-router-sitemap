export default (paths = [], query = '', value = '') => {
	return paths.map(path => path.replace(query, value));
};
