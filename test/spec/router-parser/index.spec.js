import 'jasmine-collection-matchers';
import routes from '../../data/routes';
import { pathsWithParams } from '../../data/paths';
import parser from '../../../lib/routes-parser';

describe('router parser', () => {

	it('return plain array with paths', () => {

		let source;
		let etalon;

		source = routes;
		etalon = pathsWithParams;

		expect(parser(source)).toHaveSameItems(etalon, true);

		source = routes[0];
		etalon = [ routes[0].path ];

		expect(parser(source)).toHaveSameItems(etalon, true);

	});

});
