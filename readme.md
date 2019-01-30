# React Router Sitemap

[![Build Status](https://travis-ci.org/kuflash/react-router-sitemap.svg?branch=master)](https://travis-ci.org/kuflash/react-router-sitemap) [![npm version](https://badge.fury.io/js/react-router-sitemap.svg)](https://badge.fury.io/js/react-router-sitemap)

Module for generating sitemaps using [React Router](https://www.npmjs.com/package/react-router) configuration. Also it can filter paths and replace params (like a `:paramName`) in dynamic paths.

## Install

`npm i --save react-router-sitemap`

## Usage

You need to have a module with the router configuration. For example:

`router.jsx`
```js
import React from 'react';
import { Route } from 'react-router';

export default (
	<Route>
		<Route path='/' />
		<Route path='/about' />
		<Route path='/projects' />
		<Route path='/contacts' />
		<Route path='/auth' />
	</Route>
);
```
If you are using v4 `react-router`, your `router.jsx` might be:
```js
import React from 'react';
import { Switch, Route } from 'react-router';

export default (
	// Switch is added in v4 react-router
	<Switch>
		<Route path='/' />
		<Route path='/about' />
		<Route path='/projects' />
		<Route path='/contacts' />
		<Route path='/auth' />
		<Route /> // No-match case
	</Switch>
);
```
And you need to create a script which will run from the command line or on the server.

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

It's a minimal example. After running the script, a `sitemap.xml` file will be created, which includes all paths, described in the configuration of `react-router`.

A more detailed example can be found in the `example` directory. You can also explore the details of the [API](api.md).


## [API](api.md)
Explore the public API for using the module.

## License

React Router Sitemap is freely distributable under the terms of the MIT license.

MIT License

Copyright (c) 2016 kuflash

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
