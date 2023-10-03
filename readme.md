# ExpressDirectoryRouter

[![Version package](https://badgen.net/npm/v/@kyri123/express-app-router)](https://npmjs.com/@kyri123/express-app-router) [![DL TOTAL](https://badgen.net/npm/dt/@kyri123/express-app-router)](https://npmjs.com/package/@kyri123/express-app-router) [![LATEST RELEASE](https://badgen.net/github/release/Kyri123/ExpressDirectoryRouter)](https://npmjs.com/package/embedgenerator) [![ALL CONTRIBUTOR](https://badgen.net/github/contributors/Kyri123/ExpressDirectoryRouter)](https://npmjs.com/package/embedgenerator)

ExpressDirectoryRouter is a lightweight and flexible middleware for Express.js that simplifies routing by automatically handling routes based on the structure of your project directories.

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
    -   [JavaScript](#javascript)
    -   [TypeScript](#typescript)
    -   [Middleware](#middleware)
    -   [Directory-Routes](#directory-routes)
    -   [Route-Functions](#route-functions)
-   [Documentation](https://github.com/Kyri123/ExpressDirectoryRouter/tree/docs/doc)
-   [Contributing](#contributing)
-   [License](#license)

## Installation

You can install ExpressDirectoryRouter using npm, yarn, or pnpm for example:

```bash
npm install @kyri123/express-directory-router

yarn add @kyri123/express-directory-router

pnpm add @kyri123/express-directory-router
```

## Usage

To use ExpressDirectoryRouter, simply require it and use it as middleware in your Express application:

### Javascript

```js
const express = require('express');
const { installAppExpress } = require('express-directory-router');

const app = express();

// install routings with default settings
installAppExpress(app).then(() => {
	app.listen(3000, () => {
		console.log('Server is running on http://localhost:3000');
	});
});
```

### Typescript

```js
import express from 'express';
import { installAppExpress } from 'express-directory-router';

const app = express();

// install routings with default settings
installAppExpress(app).then(() => {
	app.listen(3000, () => {
		console.log('Server is running on http://localhost:3000');
	});
});
```

### Middleware

Middleware can be used in the following formats the name of the file must ne `middleware.(js|ts)` Following named exports are supported:

-   `GET`
-   `POST`
-   `PUT`
-   `DELETE`
-   `PATCH`
-   `GLOBAL` -> GLOBAL is a special middleware that is executed for all routes and methods **(also in subdirectories)**
-   `WILDCARD` -> WILDCARD is a special middleware that is executed for all routes and methods **(BUT NOT in subdirectories)**
-   `HEAD`
-   `OPTIONS`
-   `ALL`
-   `TRACE`

```ts
import { type MiddleWareInit } from '@kyri123/express-directory-router';

export const GET: MiddleWareInit = async (payload) => {
	return [
		(req, res, next) => {
			return next();
		}
	];
};

export const GLOBAL: MiddleWareInit = async (payload) => {
	return [
		(req, res, next) => {
			return next();
		}
	];
};
```

### Directory-Routes

Route the directory structure is as follows:

| Directory        | Description                                           | Directory            | Express Route      |
| ---------------- | ----------------------------------------------------- | -------------------- | ------------------ |
| `XYZ`            | name of the Route for exmaple                         | `xyz/123`            | `/xyz/123`         |
| `[paramname]`    | will used for params                                  | `xyz/[paramname]`    | `/xyz/:paramname`  |
| `[paramname...]` | will used for params and route all subdirectorys here | `xyz/[paramname...]` | `/xyz/:paramname*` |
| `(xyz)`          | will ignored for routing so used for organisation     | `xyz/(group)/123`    | `/xyz/123`         |
| `[...]`          | Will route all subdirectory here                      | `xyz/[...]`          | `/xyz/*`           |
| `XYZ`            | name of the Route for exmaple                         | `xyz/123`            | `/xyz/123`         |

### Route-Functions

Routes can be used in the following formats the name of the file must ne `('get'|'post'|'put'|'delete'|'all'|'head'|'connect'|'options'|'trace').(js|ts)`: named exports:

-   `middleware` -> (optional) - Middleware for the route (see [Middleware](#middleware))
-   `default` -> (required) - The route handler must be a RoutingFunction

````ts


```ts
import { ResponseStatus, jsend, type MiddleWareInit, type RoutingFunction } from '@kyri123/express-directory-router';

export const middleware: MiddleWareInit = async (payload) => {
	return [
		(req, res, next) => {
			return next();
		}
	];
};

const handler: RoutingFunction = async ({ response, request, next, payload }) => {
	response.status(200).json(
		jsend(ResponseStatus.Success, {
			data: { message: 'Hello World' }
		})
	);
};

export default handler;
````

## Documentation

You can find the detailed documentation for ExpressDirectoryRouter in the docs directory.

## Contributing

We welcome contributions! If you find a bug or have an idea for a new feature, please open an issue or submit a pull request.

Please make sure to follow our code of conduct.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

Thanks to the contributors of Express.js for providing a powerful web application framework.

```

```
