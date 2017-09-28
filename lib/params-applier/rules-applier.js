import applyRule from './rule-applier';

export default (path = '', rules = []) => {

	return (
		rules
			.map(rule => applyRule(path, rule))
			.reduce((result, item) => result.concat(item), [])
			.map(location => {
				// for each remaining (optional) param group that hasn't been removed, the optional group is removed from the location
				// /foo/bar(/:param) => /foo/bar
				location = location.replace(/\((.*:.*)\)/g, '');

				// remove other parenthesis that might be wrapping params that have been replaced
				// /foo(/:bar) => /foo(/bar-value) => /foo/bar-value
				location = location.replace(/(\(|\))/g, '');

				return location;
			})
	);

};
