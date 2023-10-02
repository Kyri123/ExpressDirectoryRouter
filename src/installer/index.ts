import type { AppExpressInstallResult, AppExpressSettings, ExpressApp, MiddlewareFunction } from '../types';
import { startScan } from './install';
import { installErrorHandler, installMiddlewares } from './middleware';
import { validateInput } from './validate';

/**
 *  Install the app
 * @param app  the express app
 * @param settings  the settings for the app
 * @returns  the result of the installation
 */
export async function installAppExpress(app: ExpressApp, settings: AppExpressSettings): Promise<AppExpressInstallResult> {
	const result: AppExpressInstallResult = {
		cookieParser: false,
		errorHandler: false,
		notFoundHandler: false,
		globalMiddlewares: [],
		installedRoutes: []
	};

	// validate settings
	await validateInput(app, settings);

	// install middleware
	await installMiddlewares(app, result, settings);

	// start install
	const middlewares: MiddlewareFunction[] = [];
	await startScan(app, settings.source!, result, settings, middlewares);

	// install error handler
	await installErrorHandler(app, result, settings);

	return result;
}

export * from './const';
