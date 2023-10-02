import { cloneDeep } from 'lodash';

/**
 * handle async functions in express
 * and catch the errors to pass them to the error handler
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
 * @function asyncHandler
 */
export function wrapInHandler(fns: any[] | any) {
	fns = cloneDeep(fns);
	if (fns instanceof Array)
		return fns.map((fn) => {
			return asyncHandler(fn);
		});
	return [asyncHandler(fns)];
}
