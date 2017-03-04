import 'jasmine-collection-matchers';
import buildSitemap from '../../../lib/sitemap-builder';

describe('sitemap builder', () => {

	it('should build the sitemap', () => {

		const paths = [
			'/hello/',
		];

		const etalon = {
			limit: 50000,
			hostname: 'http://localhost',
			urls: [
				{
					url: '/hello/',
				}
			],
			cacheResetPeriod: 0,
			cache: ''
		};

		expect(buildSitemap(undefined, paths)).toHaveSameItems(etalon, true);

	});

});
