import type express from 'express';
import { ZodError } from 'zod';
import { ApiError, ResponseStatus, asyncHandler, jsend, wrapInHandler } from '../helper';
import type { AppExpressInstallResult, AppExpressSettings, ExpressApp, MiddlewareFunction } from '../types';
import { shouldUse } from './validate';

/**
 * install the middlewares
 * @private
 */
export async function installMiddlewares(app: ExpressApp, result: AppExpressInstallResult, settings: AppExpressSettings) {
	const middlewares: MiddlewareFunction[] = settings.middlewares?.globalMiddlewares
		? await settings.middlewares.globalMiddlewares(settings.payload || {})
		: [];

	if (shouldUse(settings.middlewares?.cookieParser)) {
		result.cookieParser = true;
		app.use(require('cookie-parser')());
	}

	if (middlewares.length > 0) {
		result.globalMiddlewares.push(...middlewares);
		app.use(...wrapInHandler(middlewares));
	}
}

/**
 * install the error handler with jssend
 * @private
 */
export async function installErrorHandler(app: ExpressApp, result: AppExpressInstallResult, settings: AppExpressSettings) {
	if (shouldUse(settings.middlewares?.notFoundHandler)) {
		result.notFoundHandler = true;

		// @ts-ignore
		app.use(
			settings.middlewares?.notFoundHandlerFunction
				? asyncHandler(async (request: express.Request, response: express.Response, next: express.NextFunction) => {
						return settings.middlewares!.notFoundHandlerFunction({ next, request, response, payload: settings.payload || {} });
				  })
				: (request: express.Request, response: express.Response, next: express.NextFunction) => {
						next(new ApiError(404, 'Not Found'));
				  }
		);
	}

	if (shouldUse(settings.middlewares?.errorHandler)) {
		result.errorHandler = true;
		app.use((err, req, res, next) => {
			if (shouldUse(settings.loggings?.logInCatch, false)) {
				if (err instanceof ZodError) {
					console.error(
						err.issues.map((e) => {
							return e.message;
						})
					);
				} else {
					console.error(err);
				}
			}

			if (settings.errorHandler?.overwriteFormat) {
				return res.status(err instanceof ApiError ? err.errCode : 500).json(settings.errorHandler.overwriteFormat(err));
			}

			if (err instanceof ZodError) {
				return res.status(400).json(
					jsend(ResponseStatus.Error, {
						code: 400,
						data: {
							zodStack: err.issues
						},
						path: req.path,
						message: err.message
					})
				);
			}
			if (err instanceof ApiError) {
				return res.status(err.errCode).json(
					jsend(ResponseStatus.Error, {
						code: 500,
						message: err.message,
						path: req.path
					})
				);
			}
			res.status(500).json(
				jsend(ResponseStatus.Error, {
					code: 500,
					message: err.message,
					path: req.path
				})
			);
		});
	}
}
