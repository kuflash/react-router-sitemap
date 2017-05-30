import applyRules from './rules-applier';

const hasRules = (path = '', paramsConfig = {}) => {
	return !!paramsConfig[path];
};

/**
 * Module for applying params in dynamic paths.
 * @module paramsApplier
 * @param {Array<String>} [paths] Array of paths
 * @param {Object<String, Array>} [paramsConfig] Configuration matching parameters and values
 * @return {Array<String>} Array of paths
 * @example
 *
 * import { paramsApplier as applyParams } from 'react-router-sitemap';
 *
 * const paths = ['/path/:param'];
 * const config = {
 *   '/path:param': [
 *     { param: 'a' },
 *     { param: [ 'b', 'c' ] },
 *   ],
 * };
 *
 * const paths = applyParams(paths, config);
 * // ['/path/a', '/path/b', '/path/c']
 *
 *  @example
 *
 * import { paramsApplier as applyParams } from 'react-router-sitemap';
 *
 * const paths = ['/path/:param/:subparam'];
 * const config = {
 *   '/path/:param/:subparam': [
 *     { param: 'a', subparam: '1' },
 *     { param: 'b', subparam: ['2', '3'] },
 *   ],
 * };
 *
 * const paths = applyParams(paths, config);
 * // ['/path/a/1', '/path/b/2', '/path/b/3']
 */
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
