import 'jasmine-collection-matchers';
import applyQuery from '../../../lib/param-rules-applier/query-applier';

describe('query applier', () => {

	it('replace params in paths by regexp query', () => {

		const paths = ['/path/:param-one'];
		const query = new RegExp(':param-one');
		const value = 'sub-path';
		const etalon = ['/path/sub-path'];

		expect(applyQuery(paths, query, value)).toHaveSameItems(etalon, true);

	});

});
