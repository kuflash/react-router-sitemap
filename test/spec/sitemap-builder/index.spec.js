import 'jasmine-collection-matchers';
import buildSitemap from '../../../lib/sitemap-builder';

describe('sitemap builder', () => {

	it('should build the sitemap', () => {

		const paths = [
			'/hello/',
		];

		const hostname = 'http://localhost';

		const etalon = {
			limit: 50000,
			hostname,
			urls: [
				{
					url: '/hello/',
				}
			],
			cacheResetPeriod: 0,
			cache: ''
		};

		expect(buildSitemap(hostname, paths)).toHaveSameItems(etalon, true);

	});

});
