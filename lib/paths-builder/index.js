import { createRoutes } from 'react-router';
import parseRoutes from '../routes-parser';
import filterPaths from '../paths-filter';
import applyParams from '../param-rules-applier';

export {
	parseRoutes,
	filterPaths,
	applyParams,
};

export default (router = null, filter = {}, params = null) => {

	if (!router) {
		throw new Error('Need pass router in module');
	}

	const routes = createRoutes(router);
	let paths = null;

	paths = parseRoutes(routes);
	paths = filterPaths(paths, filter.rules, filter.isValid || false);
	paths = applyParams(paths, params);

	return paths;

};
