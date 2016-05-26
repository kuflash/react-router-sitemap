import applyRule from './rule-applier';

export default (path = '', rules = []) => {

	return (
		rules
			.map(rule => applyRule(path, rule))
			.reduce((result, item) => result.concat(item), [])
	);

};
