# Sitemap

Generate sitemap by [React Router](https://www.npmjs.com/package/react-router) configuration.

**Examples**

```javascript
import Sitemap from 'react-router-sitemap';

const sitemap = (
  new Sitemap(<Route path='/home'>)
    .build('http://my-site.ru')
    .save();
);
```

## constructor

Convert React Router config to array of paths.

**Parameters**

-   `router` **Route** React Router configuration.

**Examples**

```javascript
import Sitemap from 'react-router-sitemap';

const sitemap = new Sitemap(<Route path='/home'>);
```

## filterPaths

Filters path on the specified rules.

**Parameters**

-   `filterConfig` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Filter configuration

**Properties**

-   `rules` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)>** List filter rules.
-   `isValid` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Flag that defines a way to filter paths.
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

Replaces the dynamic parameters in paths the passed value.

**Parameters**

-   `paramsConfig` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)&lt;[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)>** Configuration for replace params.

**Examples**

_Config for replace params `:param` in path `/path/:param`_

```javascript
{
  '/path/:param': [
    { param: 'value' }
  ]
}
```

_Config for replace params `:param` and `:subparam`
in path `/path/:param/:subparam`_

```javascript
{
  '/path/:param/:subparam': [
    { param: 'value', subparam: 'subvalue' }
  ]
}
```

## build

Convert array of paths to sitemap.

**Parameters**

-   `hostname` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The root name of your site.

## save

Save sitemap in file.

**Parameters**

-   `dist` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The path and file name where the sitemap is saved.

# paramsApplier

Module for apply params in dynamic paths.

**Parameters**

-   `paths` **\[[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>]** Array of paths
-   `paramsConfig` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)&lt;[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)>]** Configuration matching parameters and values

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

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>** Array of paths

# pathsFilter

Module for filter array of paths.

**Parameters**

-   `paths` **\[[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>]** Array of paths
-   `rules` **\[[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)>]** Filter rules
-   `isValidRules` **\[[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** Flag that defines a way to filter paths.
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

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>** Array of paths.

# routesParser

Module for parsing result of execute function `createRoutes(<Route>)`
from [react-router](https://www.npmjs.com/package/react-router) package.

**Parameters**

-   `routes` **\[([Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) \| [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))]** Result of execute function
    `createRoutes(<Route>)` (optional, default `[]`)
-   `basePath` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** Prefix for all paths (optional, default `''`)

**Examples**

```javascript
import { createRoutes } from 'react-router';
import { routesParser as parseRoutes } from 'react-router-sitemap';

const routes = createRoutes(<Route path='/home'>);
const paths = parseRoutes(routes); // ['/home']
```

```javascript
import { createRoutes } from 'react-router';
import { routesParser as parseRoutes } from 'react-router-sitemap';

const routes = createRoutes(<Route path='/home'>);
const prefix = '/prefix';
const paths = parseRoutes(routes, prefix); // ['/prefix/home']
```

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>** Array of paths

# sitemapBuilder

Module for build sitemap by array of paths. Using [sitemap](https://www.npmjs.com/package/sitemap) package.

**Parameters**

-   `hostname` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** The root name of your site
-   `paths` **\[[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>]** Array of paths

**Examples**

```javascript
import { sitemapBuilder as buildSitemap } from 'react-router-sitemap';

const paths = ['/', 'home', '/contacts'];
const hostname = 'http://may-site.ru';
const sitemap = buildSitemap(hostname, paths);
```

Returns **Sitemap** Instance of [Sitemap](https://www.npmjs.com/package/sitemap).
