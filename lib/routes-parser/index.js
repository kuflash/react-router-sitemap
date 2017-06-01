import buildPath from './path-builder';

/**
 * Module for parsing the result of the `createRoutes(<Route>)` function.
 * from [react-router](https://www.npmjs.com/package/react-router) package.
 * @module routesParser
 * @param {Array|Object} [routes = []] Result of execute function
 * `createRoutes(<Route>)`
 * @param {String} [basePath = ''] Prefix for all paths
 * @return {Array<String>} Array of paths
 *
 * @example
 * import { createRoutes } from 'react-router';
 * import { routesParser as parseRoutes } from 'react-router-sitemap';
 *
 * const routes = createRoutes(<Route path='/home'>);
 * const paths = parseRoutes(routes); // ['/home']
 *
 * @example
 * import { createRoutes } from 'react-router';
 * import { routesParser as parseRoutes } from 'react-router-sitemap';
 *
 * const routes = createRoutes(<Route path='/home'>);
 * const prefix = '/prefix';
 * const paths = parseRoutes(routes, prefix); // ['/prefix/home']
 */
const parseRoutes = (routes = [], basePath = '') => {

	const isArrayOfRoutes = Array.isArray(routes);

	if (!isArrayOfRoutes) {

		const path = buildPath(basePath, routes.path);
		const childRoutes = routes.childRoutes;
		const hasChilds = childRoutes && childRoutes.length;

		if (!hasChilds) {
			return [path];
		}

		const childs = parseRoutes(childRoutes, path);

		return [path].concat(childs);
	}

	return routes.reduce((result, route) => {

		const path = buildPath(basePath, routes.path);
		const childs = parseRoutes(route, path);

		return result.concat(childs);

	}, []);

};

export default parseRoutes;
