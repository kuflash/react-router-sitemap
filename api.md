# Sitemap

Generate a sitemap using the [React Router](https://www.npmjs.com/package/react-router) configuration.

**Examples**

```javascript
import Sitemap from 'react-router-sitemap';

const sitemap = (
  new Sitemap(<Route path='/home'>)
    .build('http://my-site.ru')
    .save("./sitemap.xml");
);
```

## constructor

Convert a React Router config to an array of paths.

**Parameters**

-   `router` **Route** React Router configuration.

**Examples**

```javascript
import Sitemap from 'react-router-sitemap';

const sitemap = new Sitemap(<Route path='/home'>);
```

## filterPaths

Filter paths using the specified rules.

**Parameters**

-   `filterConfig` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Filter configuration

**Properties**

-   `rules` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[RegExp](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)>** List filter rules.
-   `isValid` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Flag that defines a way to filter paths.
    If `true`, the path satisfying the rules will be included.
    If `false`, the path satisfying the rules will be excluded.

**Examples**

_Config for exclude `/auth` and `/thanks`_

```javascript
{ isValid: false, rules: [/\/auth/, /\/thanks/] }
```

_Config for include `/auth` and `/thanks`_

```javascript
{ isValid: true, rules: [/\/auth/, /\/thanks/] }
```

## applyParams

Replace the dynamic parameters in paths using the given values.

**Parameters**

-   `paramsConfig` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)&lt;[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)>** Configuration for replacing params.

**Examples**

_Config for replacing params `:param` in the path `/path/:param`_

```javascript
{
  '/path/:param': [
    { param: 'value' }
  ]
}
```

_Config for replacing params `:param` and `:subparam`
in the path `/path/:param/:subparam`_

```javascript
{
  '/path/:param/:subparam': [
    { param: 'value', subparam: ['subvalue1', 'subvalue2'] }
  ]
}
```

## build

Convert array of paths to sitemap.

**Parameters**

-   `hostname` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The root name of your site.
-   `$1` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `{}`)
    -   `$1.limitCountPaths`   (optional, default `49999`)

## save

Save sitemaps and sitemap index in files.

**Parameters**

-   `dist` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The path and file name where the sitemap index is saved.
-   `publicPath` **\[[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)](default '/')** optional public path relative to hostname, default: '/'

# pathsSplitter

Module for splitting paths array in multiple arrays for support of large projects

**Parameters**

-   `paths` **\[[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)]** Initial paths array (flattened) (optional, default `[]`)
-   `size` **\[[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)]**  (optional, default `49999`)

**Examples**

```javascript
import { pathsSplitter } from 'react-router-sitemap';

const splitted = pathsSplitter(paths, 49999); // 49999 because of Google sitemap limits
```

# paramsApplier

Module for applying params in dynamic paths.

**Parameters**

-   `paths` **\[[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>]** Array of paths
-   `paramsConfig` **\[[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)&lt;[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)>]** Configuration matching parameters and values

**Examples**

```javascript
import { paramsApplier as applyParams } from 'react-router-sitemap';

const paths = ['/path/:param'];
const config = {
  '/path:param': [
    { param: 'a' },
    { param: [ 'b', 'c' ] },
  ],
};

const paths = applyParams(paths, config);
// ['/path/a', '/path/b', '/path/c']
```

```javascript
import { paramsApplier as applyParams } from 'react-router-sitemap';

const paths = ['/path/:param/:subparam'];
const config = {
  '/path/:param/:subparam': [
    { param: 'a', subparam: '1' },
    { param: 'b', subparam: ['2', '3'] },
  ],
};

const paths = applyParams(paths, config);
// ['/path/a/1', '/path/b/2', '/path/b/3']
```

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** Array of paths

# pathsFilter

Module for filtering an array of paths.

**Parameters**

-   `paths` **\[[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>]** Array of paths
-   `rules` **\[[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[RegExp](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)>]** Filter rules
-   `isValidRules` **\[[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** Flag that defines a way to filter paths.
    If `true`, the path satisfying the rules will be included.
    If `false`, the path satisfying the rules will be excluded.

**Examples**

```javascript
import { pathsFilter as filterPaths } from 'react-router-sitemap';

const paths = ['/', '/home', '/auth'];
const rules = [/\/auth/];
const isValidRules = false;

const paths = filterPaths(paths, rules, isValidRules);
// ['/', '/home']
```

```javascript
import { pathsFilter as filterPaths } from 'react-router-sitemap';

const paths = ['/', '/home', '/auth'];
const rules = [/\/auth/];
const isValidRules = true;

const paths = filterPaths(paths, rules, isValidRules);
// ['/auth']
```

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** Array of paths.

# createRoutes

Creates and returns an array of routes from the given object which
may be a JSX route, a plain object route, or an array of either.

**Parameters**

-   `routes` **Route** React Router configuration.

**Examples**

```javascript
import { routesCreater as createRoutes } from 'react-router-sitemap';
import { routesParser as parseRoutes } from 'react-router-sitemap';

const routes = createRoutes(<Route path='/home'>);
const paths = parseRoutes(routes); // ['/home']
```

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** 

# routesParser

Module for parsing the result of the `createRoutes(<Route>)` function.

**Parameters**

-   `routes` **\[([Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array) \| [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object))]** Result of execute function
    `createRoutes(<Route>)` (optional, default `[]`)
-   `basePath` **\[[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)]** Prefix for all paths (optional, default `''`)

**Examples**

```javascript
import { routesCreater as createRoutes } from 'react-router-sitemap';
import { routesParser as parseRoutes } from 'react-router-sitemap';

const routes = createRoutes(<Route path='/home'>);
const paths = parseRoutes(routes); // ['/home']
```

```javascript
import { routesCreater as createRoutes } from 'react-router-sitemap';
import { routesParser as parseRoutes } from 'react-router-sitemap';

const routes = createRoutes(<Route path='/home'>);
const prefix = '/prefix';
const paths = parseRoutes(routes, prefix); // ['/prefix/home']
```

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** Array of paths

# sitemapBuilder

Module for building a sitemap using an array of paths. Uses the [sitemap](https://www.npmjs.com/package/sitemap) package.

**Parameters**

-   `hostname` **\[[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)]** The root name of your site
-   `paths` **\[[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>]** Array of paths

**Examples**

```javascript
import { sitemapBuilder as buildSitemap } from 'react-router-sitemap';

const paths = ['/', 'home', '/contacts'];
const hostname = 'http://may-site.ru';
const sitemap = buildSitemap(hostname, paths);
```

Returns **Sitemap** instance of [Sitemap](https://www.npmjs.com/package/sitemap).
