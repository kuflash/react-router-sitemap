import applyQuery from './query-applier';

export default (paths = [], param = '', values = []) => {

	const query = new RegExp(':' + param);

	values = Array.isArray(values) ? values : [values];

	return (
		values
			.map(value => applyQuery(paths, query, value))
			.reduce((result, path) => result.concat(path))
	);

};
