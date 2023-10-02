import type express from 'express';
import './globals';

/**
 * alias type for MiddlewareFunction
 */
export type MiddlewareFunctionHandler<Req = AppExpressTypes.AppRequest, Res = AppExpressTypes.AppResponse> = (
	request: Req,
	response: Res,
	next: express.NextFunction
) => Promise<any | never>;

/**
 * Type for the middleware function
 * this will be used in MiddleWareInit
 */
export type MiddlewareFunction<Req = AppExpressTypes.AppRequest, Res = AppExpressTypes.AppResponse> =
	| MiddlewareFunctionHandler<Req, Res>
	| express.RequestHandler<any>;

/**
 * Type for the init function of the middleware
 */
export type MiddleWareInit = (payload: AppExpressTypes.Payload) => MiddlewareFunction[] | Promise<MiddlewareFunction[]>;

/**
 * Type for the routing function
 * like GET, POST, DELETE, ...
 */
export type RoutingFunction<Req = AppExpressTypes.AppRequest, Res = AppExpressTypes.AppResponse> = (handle: {
	error?: express.Errback;
	next: express.NextFunction;
	request: Req;
	response: Res;
	payload: AppExpressTypes.Payload;
}) => Promise<any | never> | any | never;

/**
 * Type for the express app or router
 */
export type ExpressApp = express.Application | express.Router;

/**
 * functions to query the middleware
 * like GET, POST, DELETE, ...
 * GLOBAL is for the global middleware and will also applied to all routes in sub directories
 */
export type MiddlewareFunctionQuery = {
	GLOBAL?: MiddleWareInit;
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
	default?: RoutingFunction;
};
