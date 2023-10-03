import { cloneDeep } from 'lodash';

/**
 * handle async functions in express
 * and catch the errors to pass them to the error handler (NEXT)
 * @param fn the function to wrap
 * @return {RoutingFunction} the wrapped function
 * @function asyncHandler
 * @example
 * ```ts
 * const mittleware: RoutingFunction = asyncHandler(async ({ request, response, next, payload }) => {
 * 	response.send('Hello World');
 * });
 * ```
 */
export function asyncHandler<T>(fn: T) {
	const resolve = (req, res, next) => {
		// @ts-ignore
		return Promise.resolve(fn(req, res, next)).catch(next);
	};
	return resolve as T;
}

/**
 * wrap all functions in asyncHandler to catch errors in express
 * @param fns the functions to wrap
 * @return {RoutingFunction[]} the wrapped functions
 * @function asyncHandler
 * @example
 * ```ts
 * const mittlewares: RoutingFunction = wrapInHandler([
 *   async ({ request, response, next, payload }) => {
 *   	response.send('Hello World');
 *   },
 *   async ({ request, response, next, payload }) => {
 *   	response.send('Hello World');
 *   }
 * ]);
 * ```
 */
export function wrapInHandler(fns: any[] | any) {
	fns = cloneDeep(fns);
	if (fns instanceof Array)
		return fns.map((fn) => {
			return asyncHandler(fn);
		});
	return [asyncHandler(fns)];
}
