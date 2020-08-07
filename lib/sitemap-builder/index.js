import sitemap from 'sitemap';

/**
 * Module for building a sitemap using an array of paths. Uses the [sitemap](https://www.npmjs.com/package/sitemap) package.
 * @module sitemapBuilder
 * @param {String} [hostname] The root name of your site
 * @param {Array<String>} [paths] Array of paths
 * @return {Sitemap} instance of [Sitemap](https://www.npmjs.com/package/sitemap).
 *
 * @example
 * import { sitemapBuilder as buildSitemap } from 'react-router-sitemap';
 *
 * const paths = ['/', 'home', '/contacts'];
 * const hostname = 'http://may-site.ru';
 * const sitemap = buildSitemap(hostname, paths);
 */
// export default (hostname = 'http://localhost', paths = []) => {
//
// 	return sitemap.createSitemap({
// 		hostname,
// 		urls: paths.map(path => ({ url: path })),
// 	});
//
// };


/**
 *
 * @param {String} [hostname] The root name of your site
 * @param {Array<String>} [paths] Array of paths
 * @param {{}} alternatePaths
 * @param {{}} options
 * @param batchOptionsArr
 * @return {Sitemap} instance of [Sitemap](https://www.npmjs.com/package/sitemap).
 */
export default (hostname = 'http://localhost', paths = [], alternatePaths = {}, options = {}, batchOptionsArr = []) => {
	return sitemap.createSitemap({
		hostname,
		urls: paths.map((path, index) => {
			options = {
				...options,
				...batchOptionsArr.find(batchOptions =>
					path === paths.find(urlPath =>
						batchOptions.slug.split('/').every(slug =>
							urlPath.split('/').includes(slug)
						)
					)
				),
				...{ url: path }
			};

			for (const key of Object.keys(options)) {
				switch (key) {
					case 'lastmod':
						/**
						 * lastmod does not work in sitemap.js < 1.7.0
						 * https://github.com/ekalinin/sitemap.js/issues/16
						 */
						options.lastmodISO = (options.lastmod && new Date(options.lastmod).toISOString()) || '';
						delete options[key];
						break;
					case 'links':
						options[key] = options[key].map(link => ({ ...link, url: (alternatePaths[link.lang] || paths)[index] }));
						break;
				}

				if (typeof options[key] === 'undefined') {
					delete options[key];
				}
			}

			return options;
		})
	});
};
