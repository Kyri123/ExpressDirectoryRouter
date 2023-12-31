import type express from 'express';
import type * as core from 'express-serve-static-core';
import './globals';

/**
 * alias type for MiddlewareFunction
 * @example
 * ```ts
 * const middleware: MiddlewareFunctionHandler = async (request, response, next) => {
 * 	next();
 * };
 * ```
 */
export type MiddlewareFunctionHandler<
	Params extends core.ParamsDictionary = core.ParamsDictionary,
	ReqBody = any,
	ReqQuery extends core.Query = core.Query
> = (
	request: AppExpressTypes.AppRequest<Params, ReqBody, ReqQuery>,
	response: AppExpressTypes.AppResponse,
	next: express.NextFunction
) => Promise<any | never>;

/**
 * Type for the middleware function
 * this will be used in MiddleWareInit
 * @example
 * ```ts
 * const middleware: MiddlewareFunction = async (request, response, next) => {
 * 	next();
 * };
 * ```
 */
export type MiddlewareFunction = MiddlewareFunctionHandler | express.RequestHandler<any>;

/**
 * Type for the init function of the middleware
 * this will be used in the middleware query
 * @example
 * ```ts
 * const middleware: MiddleWareInit = (payload) => {
 * 	return [async (request, response, next) => {
 * 		next();
 * 	}];
 * };
 * ```
 */
export type MiddleWareInit = (payload: AppExpressTypes.Payload) => MiddlewareFunction[] | Promise<MiddlewareFunction[]>;

/**
 * Type for the routing function
 * like GET, POST, DELETE, ...
 * @example
 * ```ts
 * const route: RoutingFunction = async ({ request, response, next, payload }) => {
 * 	response.send('Hello World');
 * };
 * ```
 */
export type RoutingFunction<
	Params extends core.ParamsDictionary = core.ParamsDictionary,
	ReqBody = any,
	ReqQuery extends core.Query = core.Query
> = (handle: {
	error?: express.Errback;
	next: express.NextFunction;
	request: AppExpressTypes.AppRequest<Params, ReqBody, ReqQuery>;
	response: AppExpressTypes.AppResponse;
	payload: AppExpressTypes.Payload;
}) => Promise<any | never> | any | never;

/**
 * Type for the express app or router
 * @example
 * ```ts
 * const app: ExpressApp = express();
 * ```
 */
export type ExpressApp = express.Application | express.Router;

/**
 * functions to query the middleware
 * like GET, POST, DELETE, ...
 * GLOBAL is for the global middleware and will also applied to all routes in sub directories
 * @example
 * ```ts
 * const middleware: MiddlewareFunctionQuery = {
 * 	GLOBAL: (payload) => {
 * 		return [async (request, response, next) => {
 * 			next();
 * 		}];
 * 	},
 * 	WILDCARD: (payload) => {
 * 		return [async (request, response, next) => {
 * 			next();
 * 		}];
 * 	}
 * };
 * ```
 */
export type MiddlewareFunctionQuery = {
	GLOBAL?: MiddleWareInit;
	WILDCARD?: MiddleWareInit;
	GET?: MiddleWareInit;
	POST?: MiddleWareInit;
	PUT?: MiddleWareInit;
	DELETE?: MiddleWareInit;
	ALL?: MiddleWareInit;
	HEAD?: MiddleWareInit;
	CONNECT?: MiddleWareInit;
	OPTIONS?: MiddleWareInit;
	TRACE?: MiddleWareInit;
};

export type RouteQuery = {
	middleware?: MiddleWareInit;
	default?: RoutingFunction | RoutingFunction[];
};
