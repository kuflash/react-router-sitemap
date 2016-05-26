import replaceParams from './params-replacer';

export default (path = '', rule = {}) => {

	const params = Object.keys(rule);

	return replaceParams([path], params, rule);

};
