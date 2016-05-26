import applyRules from './rules-applier';

const hasRules = (path = '', rules = {}) => {
	return !!rules[path];
};

export default (paths = [], rules) => {

	if (!rules) {
		return paths;
	}

	return paths.reduce((result, path) => {

		if (!hasRules(path, rules)) {
			return result.concat([path]);
		}

		return result.concat(
			applyRules(path, rules[path])
		);

	}, []);

};
