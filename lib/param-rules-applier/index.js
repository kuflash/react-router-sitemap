import applyRules from './rules-applier';

const hasRules = (path = '', paramsConfig = {}) => {
	return !!paramsConfig[path];
};

export default (paths = [], paramsConfig) => {

	if (!paramsConfig) {
		return paths;
	}

	return paths.reduce((result, path) => {

		if (!hasRules(path, paramsConfig)) {
			return result.concat([path]);
		}

		return result.concat(
			applyRules(path, paramsConfig[path])
		);

	}, []);

};
