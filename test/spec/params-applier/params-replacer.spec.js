import 'jasmine-collection-matchers';
import replaceParams from '../../../lib/params-applier/params-replacer';

describe('params replacer', () => {

	it('replace params in paths by rule', () => {

		const paths = ['/path/:param-one/:param-two'];
		const rule = {
			'param-one': 1,
			'param-two': 2,
		};
		const params = Object.keys(rule);
		const etalon = ['/path/1/2'];

		expect(replaceParams(paths, params, rule)).toHaveSameItems(etalon, true);

	});

});
