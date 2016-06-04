import fs from 'fs';
import { createRoutes } from 'react-router';
import parseRoutes from './routes-parser';
import filterPaths from './paths-filter';
import applyParams from './param-rules-applier';
import buildSitemap from './sitemap-builder';

class Sitemap {

	constructor(router) {

		if (!router) {
			throw new Error('Need pass router in module');
		}

		const routes = createRoutes(router);

		this.paths = parseRoutes(routes);

		return this;

	}

	filterPaths(filterConfig) {

		this.paths = filterPaths(
			this.paths,
			filterConfig.rules,
			filterConfig.isValid || false
		);

		return this;

	}

	applyParams(paramsConfig) {
		this.paths = applyParams(this.paths, paramsConfig);
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

export { buildSitemap, parseRoutes, filterPaths, applyParams };
