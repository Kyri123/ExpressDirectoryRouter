import type { ZodError } from 'zod';
import type { ApiError } from '../helper/errorClass';
import type { MiddlewareFunction, RoutingFunction } from './func';

/**
 * Settings for the AppExpress
 * @param source the source folder for the app (should be absolute path) | Default: join(process.cwd(), 'src', 'routes')
 * @param middlewares.cookieParser if true, the cookieParser will be added | Default: false
 * @param middlewares.globalMiddlewares if set, the globalMiddlewares that provided by the function will be added to the root of the app | Default: []
 * @param loggings.logRoutings if true, the routings will be logged | Default: true
 * @param loggings.logInCatch if true, the error will be logged in the catch block | Default: false
 * @param errorHandler.resolveZodError if true, the zod error will be resolved | Default: true
 * @param errorHandler.overwriteFormat if set, the format of the error will be overwritten | Default: undefined
 */
export type AppExpressSettings = {
	payload?: AppExpressTypes.Payload;
	source?: string;
	middlewares?: {
		cookieParser?: boolean;
		errorHandler?: boolean;
		notFoundHandler?: boolean;
		notFoundHandlerFunction: RoutingFunction;
		globalMiddlewares?: (payload: AppExpressTypes.Payload) => MiddlewareFunction[] | Promise<MiddlewareFunction[]>;
	};
	loggings?: {
		logRoutings?: boolean;
		logInCatch?: boolean;
	};
	errorHandler?: {
		resolveZodError?: boolean;
		overwriteFormat?: (error: ApiError | Error | ZodError) => object;
	};
};

/**
 * Installed route result
 */
export type AppExpressRouteResult = {
	routePath: string;
	path: string;
	method: string;
	middlewares: MiddlewareFunction[];
};

/**
 * Result for the installAppExpress function
 * @param cookieParser if true, the cookieParser is installed
 * @param globalMiddlewares the middlewares that installed to the root of the app
 * @param installedRoutes the routes that installed to the app
 */
export type AppExpressInstallResult = {
	cookieParser: boolean;
	errorHandler: boolean;
	notFoundHandler: boolean;
	globalMiddlewares: MiddlewareFunction[];
	installedRoutes: AppExpressRouteResult[];
};
