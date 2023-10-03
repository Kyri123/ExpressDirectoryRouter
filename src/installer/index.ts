import type { AppExpressInstallResult, AppExpressSettings, ExpressApp, MiddlewareFunction } from '../types';
import { startScan } from './install';
import { installErrorHandler, installMiddlewares } from './middleware';
import { validateInput } from './validate';

/**
 *  Install the app
 * @param app  the express app
 * @param settings  the settings for the app
 * @returns  the result of the installation
 * @example
 * ```ts
 * const app = express();
 * const settings: AppExpressSettings = {
 * 	source: path.join(__dirname, 'routes'),
 * 	middlewares: {
 * 		cookieParser: true,
 * 		errorHandler: true,
 * 		notFoundHandler: true,
 * 		globalMiddlewares: (payload) => {
 * 			return [async (request, response, next) => {
 * 				next();
 * 			}];
 * 		}
 * 	},
 * 	loggings: {
 * 		logRoutings: true,
 * 		logInCatch: true
 * 	},
 * 	errorHandler: {
 * 		resolveZodError: true,
 * 		overwriteFormat: (error) => {
 * 			return {
 * 				message: error.message,
 * 				code: error.code,
 * 				errors: error.errors
 * 			};
 * 		}
 * 	}
 * };
 * ```
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
