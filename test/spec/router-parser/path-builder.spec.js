import build from '../../../lib/routes-parser/path-builder';

describe('build path', () => {

	it('concat base and path with adding slashs', () => {

		let baseRoute;
		let route;

		const etalon = '/base-path/path-one';

		baseRoute = 'base-path';
		route = 'path-one';

		expect(build(baseRoute, route)).toEqual(etalon);

		baseRoute = '/base-path';
		route = '/path-one';

		expect(build(baseRoute, route)).toEqual(etalon);

		baseRoute = '/base-path/';
		route = '/path-one/';

		expect(build(baseRoute, route)).toEqual(etalon);

	});

	it('return one slash', () => {

		const baseRoute = '/';
		const route = '/';
		const etalon = '/';

		expect(build(baseRoute)).toEqual(etalon);
		expect(build(baseRoute, route)).toEqual(etalon);

	});

});
