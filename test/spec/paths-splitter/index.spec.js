import splitPaths from '../../../lib/paths-splitter';

describe('paths-splitter', () => {

	it('split arrays into multiple arrays by given maximum length count', () => {

		const paths = [true, true, false, false, false, true, true, true];
		const ethalon = 2;

		expect(splitPaths(paths, ethalon)[0].length).toEqual(ethalon);
	});

});
