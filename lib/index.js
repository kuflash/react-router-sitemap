import fs from 'fs';
import buildPaths, { parseRoutes, filterPaths, applyParams } from './paths-builder';
import buildSitemap from './sitemap-builder';

export { buildSitemap, buildPaths, parseRoutes, filterPaths, applyParams };

export default ({ router, filter, params, hostname, dist = './sitemap.xml' }) => {

	const paths = buildPaths(router, filter, params);
	const sitemap = buildSitemap(hostname, paths);

	fs.writeFileSync(dist, sitemap.toString());

};
