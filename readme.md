# React Router Sitemap

[![Build Status](https://travis-ci.org/kuflash/react-router-sitemap.svg?branch=master)](https://travis-ci.org/kuflash/react-router-sitemap)

Module for generate sitemap by [React Router](https://www.npmjs.com/package/react-router) configuration. Also it can filter paths and replace params (like a `:paramName`) in dynamic paths.

## Install

`npm i --save react-router-sitemap`

## Usage

You need have module with router configuration. For example:

`router.jsx`
```js
import React from 'react';
import { Route } from 'react-router';

export default (
	<Route>
		<Route path='/' />
		<Route path='/about' />
		<Route path='/projects'>
		<Route path='/contacts' />
		<Route path='/auth' />
	</Route>
);
```
And need create script which will run from command line or on server.

_Please note that in this case you need a module 'babel-register' to work with the ES2105 syntax and `.jsx` format._

`sitemap-builder.js`

```js
require('babel-register');

const router = require('./router').default;
const Sitemap = require('../').default;

(
	new Sitemap(router)
		.build('http://my-site.ru')
		.save('./sitemap.xml')
);
```

It's minimal example. After running the script next file will be created `sitemap.xml` which included all paths, described configuration `react-router`.

More detailed example you can see in the `example` directory. And explore detailed [API](api.md).


## [API](api.md)
Explore public API for usage of module.
