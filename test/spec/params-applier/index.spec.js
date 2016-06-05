import 'jasmine-collection-matchers';
import rules from '../../data/param-rules';
import { pathsWithParams, paths } from '../../data/paths';
import applyParams from '../../../lib/params-applier';

describe('param rules applier', () => {

	it('return the paths to the apply param rules', () => {

		const source = pathsWithParams;
		const etalon = paths;

		expect(applyParams(source, rules)).toHaveSameItems(etalon, true);

	});

});
