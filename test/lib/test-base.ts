import type { AppExpressSettings } from '@dist/index';
import express from 'express';

const app = express();
const config: AppExpressSettings = {
	loggings: {
		logRoutings: false,
		logInCatch: false
	}
};
function clearApp() {
	if (app._router) {
		app._router.stack.length = 0;
	}
}

export { app, clearApp, config };
