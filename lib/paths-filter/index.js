import prepareParams from './params-preparer';

/**
 * Module for filtering an array of paths.
 * @function pathsFilter
 * @param {Array<String>} [paths] Array of paths
 * @param {Array<RegExp>} [rules] Filter rules
 * @param {Boolean} [isValidRules] - Flag that defines a way to filter paths.
 * If `true`, the path satisfying the rules will be included.
 * If `false`, the path satisfying the rules will be excluded.
 * @return {Array<String>} Array of paths.
 *
 * @example
 *
 * import { pathsFilter as filterPaths } from 'react-router-sitemap';
 *
 * const paths = ['/', '/home', '/auth'];
 * const rules = [/\/auth/];
 * const isValidRules = false;
 *
 * const paths = filterPaths(paths, rules, isValidRules);
 * // ['/', '/home']
 *
 * @example
 *
 * import { pathsFilter as filterPaths } from 'react-router-sitemap';
 *
 * const paths = ['/', '/home', '/auth'];
 * const rules = [/\/auth/];
 * const isValidRules = true;
 *
 * const paths = filterPaths(paths, rules, isValidRules);
 * // ['/auth']
 */
export default (paths = [], rules = [], isValidRules = false) => {

	const params = prepareParams(paths, rules);

	paths = params.paths;
	rules = params.rules;

	return paths.filter((path, index) => {

		path = path.trim();

		if (!path.length) {
			return false;
		}

		const isUniq = paths.indexOf(path) === index;
		const isValid = rules.some(regex => regex.test(path)) === isValidRules;

		return isUniq && isValid;

	});

};
