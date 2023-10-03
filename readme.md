# ExpressDirectoryRouter

[![Version package](https://badgen.net/npm/v/embedgenerator)](https://npmjs.com/package/embedgenerator) [![DL TOTAL](https://badgen.net/npm/dt/@kyri123/express-app-router)](https://npmjs.com/package/@kyri123/express-app-router) <!--[![LATEST RELEASE](https://badgen.net/github/release/Kyri123/ExpressDirectoryRouter)](https://npmjs.com/package/embedgenerator)--> [![ALL CONTRIBUTOR](https://badgen.net/github/contributors/Kyri123/ExpressDirectoryRouter)](https://npmjs.com/package/embedgenerator)

ExpressDirectoryRouter is a lightweight and flexible middleware for Express.js that simplifies routing by automatically handling routes based on the structure of your project directories.

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
    -   [JavaScript](#javascript)
    -   [TypeScript](#typescript)
-   [Documentation](https://github.com/Kyri123/ExpressDirectoryRouter/tree/docs/doc)
-   [Contributing](#contributing)
-   [License](#license)

## Installation

You can install ExpressDirectoryRouter using npm:

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

## Documentation

You can find the detailed documentation for ExpressDirectoryRouter in the docs directory.

## Contributing

We welcome contributions! If you find a bug or have an idea for a new feature, please open an issue or submit a pull request.

Please make sure to follow our code of conduct.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

Thanks to the contributors of Express.js for providing a powerful web application framework.
