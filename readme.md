# React Router Sitemap

[![Build Status](https://travis-ci.org/kuflash/react-router-sitemap.svg?branch=master)](https://travis-ci.org/kuflash/react-router-sitemap)

Модуль для генерации карты сайта по конфигурации `react-router`.
Может фильтровать пути, а также заменять динамические параметры вида `:paramName`
на переданные значения.

## Установка

`npm i --save react-router-sitemap`

## Пример использования

Для начала необходимо, чтобы кофигурация маршрутов в вашем сайте была вынесена
в отдельный модуль. Примерно такого вида:

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

Далее необходимо создать файл, который будет запускаться с помощью node.js
во время сборки, либо на сервере. В этом файле будут импортироваться
конфигурация маршрутов и модуль для генерации карты сайта:

`sitemap-builder.js`
```js
require('babel-register');

const router = require('./router').default;
const buildSitemap = require('react-router-sitemap').default;

buildSitemap({ router });
```

Это минимальная конфигурация модуля. После запуска данного скрипта
рядом будет создан файл `sitemap.xml` со всеми путями,
описанными в кофигурации `react-router`.

## Алгоритм работы модуля

1. Преобразование роутера в список путей.
2. Фильтрация путей.
3. Замена парметров вида `:paramName` на переданные значения.
4. Генерация карты сайта.
5. Сохранение карты сайта в файл.

## API

### buildSitemap(config)

Доступна при стандартном импортировании модуля.
Гененрирует карту сайта и сохраняет ее в файл по указанному пути.

#### config
**Тип**: `Object`<br>
**Формат**: `{ router, filter, params, hostname, dist }`

##### router (required)
**Тип**: `Object`<br>
**По умолчанию**: `null`<br>
**Описание**: Конфигурация маршрутов в формате `react-router`

##### filter
**Тип**: `Object`<br>
**Формат**: `{ isValid, rules }`<br>
**По умолчанию**: `null`<br>
**Описание**: Правила для фильтрации путей.

**Пример**:<br>

Оставит пути удовлетворяющие правилам в массиве `rules`
```js
{
	isValid: true,
	rules: [
		/\/auth/,
		/\/home/,
	]
}
```

Удалит пути удовлетворяющие правилам в массиве `rules`
```js
{
	isValid: false,
	rules: [
		/\/auth/,
		/\/home/,
	]
}
```

##### params

**Тип**: `Object`<br>
**По умолчанию**: `null`<br>
**Описание**: Правила для замены парметров вида `:paramName` на переданные значения.
Ключами этого объекта являются пути в которых необходимо заменить параметры.
Значением этих ключей - массив объектов с определенным форматом.

**Пример**:<br>

```js
{
	'/path/:paramName': [
		{ paramName: 'one' },
		{ paramName: 'two' },
		{ paramName: ['three', 'four'] },
	],
}
```

Результатом применения таких правил будет следующий массив путей:

```js
[
	'/path/one',
	'/path/two',
	'/path/three',
	'/path/four',
]
```

##### hostname
**Тип**: `String`<br>
**По умолчанию**: `http://localhost`<br>
**Описание**: Имя хоста вашего сайта

##### dist
**Тип**: `String`<br>
**По умолчанию**: `./sitemap.xml`<br>
**Описание**: Путь и название файла, куда будет сохранена карта сайта
