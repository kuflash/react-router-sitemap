require('babel-register');

const router = require('./router').default;
const buildSitemap = require('../').default;

const filter = {
	isValid: false,
	rules: [
		/\/auth/,
		/\*/,
	],
};

const params = {
	'/projects/:projectName': [
		{ projectName: 'hello-world' },
		{ projectName: 'second-project' },
		{ projectName: ['third-project', 'fourth-project'] },
	],
	'/projects/:projectName/view': [
		{ projectName: 'hello-world' },
		{ projectName: 'second-project' },
		{ projectName: ['third-project', 'fourth-project'] },
	],
};

buildSitemap({
	router,
	filter,
	params,
	hostname: 'http://my-site.ru',
	dist: 'sitemap.xml',
});
