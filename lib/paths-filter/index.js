import prepareParams from './params-preparer';

export default (_paths = [], _rules = [], isValidRules = false) => {

	const { paths, rules } = prepareParams(_paths, _rules);

	return paths.filter(path => {

		path = path.trim();

		if (!path.length) {
			return false;
		}

		return rules.some(regex => regex.test(path)) === isValidRules;

	});

};
