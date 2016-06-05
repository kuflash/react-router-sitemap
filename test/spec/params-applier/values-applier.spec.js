import 'jasmine-collection-matchers';
import applyValues from '../../../lib/params-applier/values-applier';

describe('values applier', () => {

	it('apply values by param name', () => {

		const paths = ['/path/:param-one'];
		const param = 'param-one';
		const values = [1, 2];
		const etalon = [
			'/path/1',
			'/path/2',
		];

		expect(applyValues(paths, param, values)).toHaveSameItems(etalon, true);

	});

});
