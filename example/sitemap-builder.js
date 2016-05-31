require('babel-register');

const router = require('./router').default;
const Sitemap = require('../').default;

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

(
	new Sitemap({ router, filter, params })
		.build('http://my-site.ru')
		.save('./sitemap.xml')
);
