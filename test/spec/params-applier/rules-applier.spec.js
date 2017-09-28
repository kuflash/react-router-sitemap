import 'jasmine-collection-matchers';
import applyRules from '../../../lib/params-applier/rules-applier';

describe('rules applier', () => {

	it('replace params in path by list rules', () => {

		const path = '/path/:param-one/:param-two';
		const rules = [
			{ 'param-one': 1, 'param-two': 2 },
			{ 'param-one': 3, 'param-two': 4 },
		];
		const etalon = [
			'/path/1/2',
			'/path/3/4',
		];

		expect(applyRules(path, rules)).toHaveSameItems(etalon, true);

	});

	it('replaces optional params in path by list rules', () => {

		const path = '/path/:param-one(/:param-two)';
		const rules = [
			{ 'param-one': 1 },
			{ 'param-one': 1, 'param-two': 2 },
		];
		const etalon = [
			'/path/1',
			'/path/1/2',
		];

		expect(applyRules(path, rules)).toHaveSameItems(etalon, true);

	});

	it('removes optional params in path by list rules whose value hasn\'t been provided', () => {

		const path = '/path/:param-one(/:param-two)';
		const rules = [
			{},
			{ 'param-one': 1 },
		];
		const etalon = [
			'/path/:param-one',
			'/path/1',
		];

		expect(applyRules(path, rules)).toHaveSameItems(etalon, true);

	});

});
