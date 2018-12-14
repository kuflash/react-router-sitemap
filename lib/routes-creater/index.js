import { isReactChildren, createRoutesFromReactChildren } from './routeUtils';

/**
 * @description Creates and returns an array of routes from the given object which
 * may be a JSX route, a plain object route, or an array of either.
 * @param {Route} routes - React Router configuration.
 * @return {Array<String>}
 *
 * @example
 * import { routesCreater as createRoutes } from 'react-router-sitemap';
 * import { routesParser as parseRoutes } from 'react-router-sitemap';
 *
 * const routes = createRoutes(<Route path='/home'>);
 * const paths = parseRoutes(routes); // ['/home']
 */
const createRoutes = routes => {
	if (isReactChildren(routes)) {
		routes = createRoutesFromReactChildren(routes);
	} else if (routes && !Array.isArray(routes)) {
		routes = [routes];
	}

	return routes;
};

export default createRoutes;
