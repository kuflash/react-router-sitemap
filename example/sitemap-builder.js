require('babel-register');

const router = require('./router').default;
const Sitemap = require('../lib').default;

const filterConfig = {
	isValid: false,
	rules: [
		/\/auth/,
		/\*/,
	],
};


// Setup some random projects
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const lotOfNames = [];

function produceItem(arr, char) {
	return arr.map(c => { lotOfNames.push(`${c}-${char}`); });
}

alphabet.map(c => produceItem(alphabet, c));

const projects = {
	projectName: lotOfNames,
	achievement: lotOfNames
};


const paramsConfig = {
	'/projects/:projectName': [
		{ projectName: 'hello-world' },
		{ projectName: 'second-project' },
		{ projectName: ['third-project', 'fourth-project'] },
		projects
	],
	'/projects/:projectName/view': [
		{ projectName: 'hello-world' },
		{ projectName: 'second-project' },
		{ projectName: ['third-project', 'fourth-project'] },
		projects
	],
	'/projects/:projectName/achievements/:achievement': [
		{ projectName: 'hello-world' },
		{ projectName: 'second-project' },
		{ projectName: ['third-project', 'fourth-project'] },
		projects
	]
};

const locales = ['en', 'de'];
const defaultLocale = 'en';
const batchOptions = [];
const alternateRoutes = {};

function refinePaths(paths, lang) {
	return paths.map(path => path); // change whatever required
}

(
	new Sitemap(router)
		.filterPaths(filterConfig)
		.applyParams(paramsConfig)
		.setItemOptions(batchOptions)
		.localize(locales, alternateRoutes, paramsConfig, filterConfig, refinePaths, defaultLocale)
		.build('http://my-site.ru', { limitCountPaths: 5000 })
		.save('./sitemap.xml', '/static/')
);
