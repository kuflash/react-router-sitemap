import filterPaths from '../../../lib/paths-filter';

describe('paths filter', () => {

	it('return empty array for empty paths', () => {

		const paths = ['', ' '];
		const etalon = [];

		expect(filterPaths(paths)).toEqual(etalon);

	});

	it('return source if not pass rules or is empty', () => {

		const paths = [
			'/path-one',
			'/path-two',
		];
		const rules = [];
		const etalon = paths;

		expect(filterPaths(paths)).toEqual(etalon);
		expect(filterPaths(paths, rules)).toEqual(etalon);

	});

	it('exclude paths by rules', () => {

		const paths = [
			'/path-one',
			'/path-two',
		];
		const rules = [
			/\/path-one/,
		];
		const isValidRules = false;
		const etalon = ['/path-two'];

		expect(filterPaths(paths, rules, isValidRules)).toEqual(etalon);

	});

	it('include paths by rules', () => {

		const paths = [
			'/path-one',
			'/path-two',
		];
		const rules = [
			/\/path-one/,
		];
		const isValidRules = true;
		const etalon = ['/path-one'];

		expect(filterPaths(paths, rules, isValidRules)).toEqual(etalon);

	});

	it('return uniq paths', () => {

		const paths = [
			'/path-one',
			'/path-one',
			'/path-two',
			'/path-two',
		];

		const etalon = [
			'/path-one',
			'/path-two',
		];

		expect(filterPaths(paths)).toEqual(etalon);

	});

});
