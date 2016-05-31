import fs from 'fs';
import buildPaths, { parseRoutes, filterPaths, applyParams } from './paths-builder';
import buildSitemap from './sitemap-builder';

class Sitemap {

	constructor({ router, filter, params }) {
		this.paths = buildPaths(router, filter, params);
		return this;
	}

	build(hostname) {
		this.sitemap = buildSitemap(hostname, this.paths);
		return this;
	}

	save(dist) {
		fs.writeFileSync(dist, this.sitemap.toString());
		return this;
	}

}

export default Sitemap;

export { buildSitemap, buildPaths, parseRoutes, filterPaths, applyParams };
