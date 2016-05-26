import sitemap from 'sitemap';

export default (hostname = 'http://localhost', paths = []) => {

	return sitemap.createSitemap({
		hostname,
		urls: paths.map(path => ({ url: path })),
	});

};
