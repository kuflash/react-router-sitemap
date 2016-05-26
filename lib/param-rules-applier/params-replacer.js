import applyValues from './values-applier';

const replaceParams = (paths = [], params = [], rule = {}) => {

	if (!params.length) {
		return paths;
	}

	const param = params.shift();
	const values = rule[param];

	paths = applyValues(paths, param, values);

	return replaceParams(paths, params, rule);

};

export default replaceParams;
