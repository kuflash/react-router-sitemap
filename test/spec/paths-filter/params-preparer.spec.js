import prepareParams from '../../../lib/paths-filter/params-preparer';

describe('prepare params for filter', () => {

	it('format incorrect param to empty arrays', () => {

		const paths = 1;
		const rules = false;
		const etalon = { paths: [], rules: [] };

		expect(prepareParams(paths, rules)).toEqual(etalon);

	});

	it('format string params to array of strings', () => {

		const paths = '/path';
		const rules = '/rule';
		const etalon = { paths: ['/path'], rules: ['/rule'] };

		expect(prepareParams(paths, rules)).toEqual(etalon);

	});

	it('return object with the passed parameters if they are correct', () => {

		const paths = ['/path'];
		const rules = ['/rule'];
		const etalon = { paths: ['/path'], rules: ['/rule'] };

		expect(prepareParams(paths, rules)).toEqual(etalon);

	});

});
