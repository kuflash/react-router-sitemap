import 'jasmine-collection-matchers';
import applyRule from '../../../lib/params-applier/rule-applier';

describe('rule applier', () => {

	it('replace params in path by rule', () => {

		const path = '/path/:param-one/:param-two';
		const rule = {
			'param-one': 1,
			'param-two': 2,
		};
		const etalon = ['/path/1/2'];

		expect(applyRule(path, rule)).toHaveSameItems(etalon, true);

	});

});
