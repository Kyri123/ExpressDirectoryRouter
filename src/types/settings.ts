import type { ZodError } from 'zod';
import type { ApiError } from '../helper/errorClass';
import type { MiddlewareFunction, RoutingFunction } from './func';

/**
 * Settings for the AppExpress
 * @param payload the payload for the app
 * @param source the source folder for the app (should be absolute path)
 * @param middlewares.cookieParser if true, the cookieParser will be added
 * @param middlewares.errorHandler if true, the errorHandler will be added
 * @param middlewares.globalMiddlewares if set, the globalMiddlewares that provided by the function will be added to the root of the app
 * @param middlewares.notFoundHandler if true, the notFoundHandler will be added
 * @param middlewares.notFoundHandlerFunction if set, the notFoundHandler will be added with the function
 * @param loggings.logRoutings if true, the routings will be logged
 * @param loggings.logInCatch if true, the error will be logged in the catch block
 * @param errorHandler.resolveZodError if true, the zod error will be resolved
 * @param errorHandler.overwriteFormat if set, the format of the error will be overwritten
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
 * @param routePath the path of the route
 * @param path the path of the file
 * @param method the method of the route
 * @param middlewares the middlewares that installed to the route
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
 * @param errorHandler if true, the errorHandler is installed
 * @param notFoundHandler if true, the notFoundHandler is installed
 */
export type AppExpressInstallResult = {
	cookieParser: boolean;
	errorHandler: boolean;
	notFoundHandler: boolean;
	globalMiddlewares: MiddlewareFunction[];
	installedRoutes: AppExpressRouteResult[];
};
