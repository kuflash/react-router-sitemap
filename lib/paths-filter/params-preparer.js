export default (paths = [], rules = []) => {

	const isCorrectPaths = Array.isArray(paths);
	const isCorrectRules = Array.isArray(rules);

	if (!isCorrectPaths) {
		paths = typeof paths === 'string' ? [paths] : [];
	}

	if (!isCorrectRules) {
		rules = typeof rules === 'string' ? [rules] : [];
	}

	return { paths, rules };

};
