import fs from 'fs';
import path from 'path';

import sm from 'sitemap';

import createRoutes from './routes-creater';
import parseRoutes from './routes-parser';
import filterPaths from './paths-filter';
import applyParams from './params-applier';
import splitPaths from './paths-splitter';
import buildSitemap from './sitemap-builder';

/**
 * @class Sitemap
 * @description Generate a sitemap using the [React Router](https://www.npmjs.com/package/react-router) configuration.
 *
 * @example
 * import Sitemap from 'react-router-sitemap';
 *
 * const sitemap = (
 *   new Sitemap(<Route path='/home'>)
 *     .build('http://my-site.ru')
 *     .save("./sitemap.xml");
 * );
 */
class Sitemap {

	options: {
		slug: undefined,
		url: undefined, // {string}
		lastmod: undefined, // {string}
		changefreq: undefined, // {string} - always, hourly, daily, weekly, monthly, yearly, never
		priority: undefined, // {number}
		img: undefined, // {[]}
		video: undefined, // {[]}
		links: undefined, // {[]}
		news: undefined, // {{}}
		ampLink: undefined, // {string}
		cdata: false
	}

	batchOptions: []

	alternatePaths: {}

	/**
	 * @constructor
	 * @description Convert a React Router config to an array of paths.
	 * @param {Route} router - React Router configuration.
	 *
	 * @example
	 * import Sitemap from 'react-router-sitemap';
	 *
	 * const sitemap = new Sitemap(<Route path='/home'>);
	 */
	constructor(router) {

		if (!router) {
			throw new Error('Need pass router in module');
		}

		const routes = createRoutes(router);

		this.paths = parseRoutes(routes);


		return this;

	}

	/**
	 * Callback for refining alternate paths.
	 *
	 * @callback refinePathsCallback
	 * @param paths {string[]}
	 * @param lang {string}
	 */

	/**
	 *
	 * @param {string[]} langs - e.g. ['en', 'de', 'es', ...]
	 * @param alternateRoutes - key value pair of lang key and React Route Object as its value (e.g. {'en': <Route path='...' />})
	 * @param {{}} paramsConfig
	 * @param {{}} filterConfig
	 * @param {string} defaultLang
	 * @param refinePathsCallback {function} refining alternate paths callback function
	 * @returns {Sitemap}
	 */
	localize(langs, alternateRoutes, paramsConfig, filterConfig, refinePathsCallback = null, defaultLang = '') {
		Object.keys(alternateRoutes).forEach(lang => {
			this.alternatePaths[lang] = parseRoutes(createRoutes(alternateRoutes[lang]));

			if (typeof refinePathsCallback === 'function') {
				this.alternatePaths[lang] = refinePathsCallback(this.alternatePaths[lang], lang);
			}

			this.alternatePaths[lang] = applyParams(this.alternatePaths[lang], paramsConfig[lang]);
			this.alternatePaths[lang] = filterPaths(this.alternatePaths[lang], filterConfig);
		});

		if (defaultLang.length > 0 && langs.includes(defaultLang)) {
			langs = langs.filter(lang => lang !== defaultLang);
			langs.push(defaultLang);
		}

		this.options.links = langs.map(lang => ({
			lang,
			url: ''
		}));

		return this;
	}

	/**
	 *
	 * @param batchOptions
	 * @returns {Sitemap}
	 */
	setItemOptions(batchOptions) {
		this.batchOptions = batchOptions;

		return this;
	}

	/**
	 * @description Filter paths using the specified rules.
	 * @param {Object} filterConfig - Filter configuration
	 * @property {Array<RegExp>} rules - List filter rules.
	 * @property {Boolean} isValid - Flag that defines a way to filter paths.
	 * If `true`, the path satisfying the rules will be included.
	 * If `false`, the path satisfying the rules will be excluded.
	 *
	 * @example
	 * <caption>Config for exclude `/auth` and `/thanks`</caption>
	 * { isValid: false, rules: [/\/auth/, /\/thanks/] }
	 *
	 * @example
	 * <caption>Config for include `/auth` and `/thanks`</caption>
	 * { isValid: true, rules: [/\/auth/, /\/thanks/] }
	 */
	filterPaths(filterConfig) {

		this.paths = filterPaths(
			this.paths,
			filterConfig.rules,
			filterConfig.isValid || false
		);

		return this;

	}

	/**
	 * @description Replace the dynamic parameters in paths using the given values.
	 * @param {Object.<String, Array>} paramsConfig - Configuration for replacing params.
	 *
	 * @example
	 * <caption>Config for replacing params `:param` in the path `/path/:param`</caption>
	 * {
	 *   '/path/:param': [
	 *     { param: 'value' }
	 *   ]
	 * }
	 *
	 * @example
	 * <caption>Config for replacing params `:param` and `:subparam`
	 * in the path `/path/:param/:subparam`</caption>
	 * {
	 *   '/path/:param/:subparam': [
	 *     { param: 'value', subparam: ['subvalue1', 'subvalue2'] }
	 *   ]
	 * }
	 *
	 */
	applyParams(paramsConfig) {
		this.paths = applyParams(this.paths, paramsConfig);
		return this;
	}

	/**
	 * @description Convert array of paths to sitemap.
	 * @param {String} hostname - The root name of your site.
	 */
	build(hostname, { limitCountPaths = 49999 } = {}) {
		this.hostname = hostname;
		this.splitted = splitPaths(this.paths, limitCountPaths);
		this.sitemaps = this.splitted.map(paths => buildSitemap(hostname, paths, this.alternatePaths, this.options, this.batchOptions));
		return this;
	}

	/**
	 * @description Save sitemaps and sitemap index in files.
	 * @param {String} dist - The path and file name where the sitemap index is saved.
	 * @param {String} publicPath - optional public path relative to hostname, default: '/'
	 */
	save(dist, publicPath = '/') {
		const sitemapPaths = [];

		// sitemap index is not needed in case of one sitemap file
		if (this.sitemaps.length === 1) {
			// write sitemap
			fs.writeFileSync(dist, this.sitemaps[0].toString());

			return this;
		}

		this.sitemaps.map((sitemap, index) => {
			const savePath = dist.replace('.xml', `-${index}.xml`);

			// write sitemap
			fs.writeFileSync(savePath, sitemap.toString());

			// push public path for indexing
			sitemapPaths.push(this.hostname + publicPath + path.basename(savePath));
		});

		// create index string
		const sitemapIndex = sm.buildSitemapIndex({
			urls: sitemapPaths,
			hostname: this.hostname
		});

		// write sitemap index
		fs.writeFileSync(dist, sitemapIndex);

		return this;
	}

}

export default Sitemap;

export { default as routesCreater } from './routes-creater';
export { default as routesParser } from './routes-parser';
export { default as pathsFilter } from './paths-filter';
export { default as paramsApplier } from './params-applier';
export { default as sitemapBuilder } from './sitemap-builder';
export { default as pathsSplitter } from './paths-splitter';
