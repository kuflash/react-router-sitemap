import buildPath from './path-builder';

const parseRoutes = (routes = [], baseRoute = '') => {

	const isArrayOfRoutes = Array.isArray(routes);

	if (!isArrayOfRoutes) {

		const path = buildPath(baseRoute, routes.path);
		const childRoutes = routes.childRoutes;
		const hasChilds = childRoutes && childRoutes.length;

		if (!hasChilds) {
			return [path];
		}

		const childs = parseRoutes(childRoutes, path);

		return [path].concat(childs);
	}

	return routes.reduce((result, route) => {

		const path = buildPath(baseRoute, routes.path);
		const childs = parseRoutes(route, path);

		return result.concat(childs);

	}, []);

};

export default parseRoutes;
