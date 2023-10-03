import * as fs from 'fs/promises';
import { cloneDeep } from 'lodash';
import { join } from 'path';
import { asyncHandler, wrapInHandler } from '../helper';
import type { AppExpressInstallResult, AppExpressSettings, ExpressApp, MiddlewareFunction, MiddlewareFunctionQuery, RouteQuery } from '../types';
import type { ValidMethods } from './const';
import { validMethods } from './const';
import { shouldUse } from './validate';

/**
 * start the scan for a directory
 * @private
 */
export async function startScan(
	app: ExpressApp,
	path: string,
	result: AppExpressInstallResult,
	settings: AppExpressSettings,
	middlewares: MiddlewareFunction[]
) {
	const scanResult = await fs.readdir(path).then((r) => {
		// we need to sort all slug directories to the end
		return r.sort((a, b) => {
			const start = b.replaceAll('\\', '/').split('/')[0];
			if (start.includes('...')) {
				return -100000000;
			}
			if (start.startsWith('[') || start.startsWith('(')) {
				return -1;
			}
			return 1;
		});
	});

	const wildcards: MiddlewareFunction[] = [];
	const middlewareFile = scanResult.find((p) => {
		return p.startsWith('middleware.');
	});

	let middlewareQuery: MiddlewareFunctionQuery = {};
	if (middlewareFile) {
		scanResult.splice(scanResult.indexOf(middlewareFile), 1);
		middlewareQuery = require(join(path, middlewareFile));
		if (middlewareQuery && middlewareQuery.GLOBAL) {
			const foundmiddlewares = await middlewareQuery.GLOBAL(settings.payload || {});
			middlewares.push(...foundmiddlewares);
		}
		if (middlewareQuery && middlewareQuery.WILDCARD) {
			const foundmiddlewares = await middlewareQuery.WILDCARD(settings.payload || {});
			wildcards.push(...foundmiddlewares);
		}
	}

	for (const file of scanResult) {
		await scanDir(app, join(path, file), file, result, settings, cloneDeep(middlewares), middlewareQuery, wildcards);
	}
}

/**
 * scan the directory and install the routes if the file is a route
 * @private
 */
export async function scanDir(
	app: ExpressApp,
	path: string,
	file: string,
	result: AppExpressInstallResult,
	settings: AppExpressSettings,
	middlewares: MiddlewareFunction[],
	middlewareFileResult: MiddlewareFunctionQuery,
	wildcards: MiddlewareFunction[]
) {
	const stat = await fs.stat(path);
	if (!stat.isDirectory()) {
		await installRoute(app, path, file, result, settings, middlewares.concat(wildcards), middlewareFileResult);
	} else {
		await startScan(app, path, result, settings, middlewares);
	}
}

/**
 * build the path for the route
 * it replace [...] with :slug
 * and (...) with nothing
 */
export function buildPath(path: string, file: string, settings: AppExpressSettings) {
	let newPath = join(
		path
			.replace(settings.source!, '')
			.replace(file, '')
			.replaceAll('[...]', '*')
			.replaceAll(/\((.*?)\)\//g, '')
			.replaceAll(/\((.*?)\)/g, '')
			.replaceAll(/\[(.*?)\]/g, (_, p1) => {
				return ':' + p1.replace('...', '*');
			})
			.replaceAll('...', '*')
			.replace('.', '/')
	)
		.replaceAll('\\', '/')
		.replaceAll(/(\/\/)/gm, '/');

	newPath = newPath.startsWith('/') ? newPath : '/' + newPath;
	newPath = newPath.endsWith('/') ? newPath.substring(0, newPath.length - 1) : newPath;
	if (newPath.trim() === '') newPath = '/';

	return newPath;
}

/**
 * install the route to the app
 * @private
 */
async function installRoute(
	app: ExpressApp,
	path: string,
	file: string,
	result: AppExpressInstallResult,
	settings: AppExpressSettings,
	middlewares: MiddlewareFunction[] = [],
	middlewareFileResult: MiddlewareFunctionQuery = {}
) {
	const { middleware: MIDDLEWARE, ...rest } = require(path) as RouteQuery;
	const ROUTE = rest.default;
	const METHOD: ValidMethods = file.split('.')[0].toLowerCase() as ValidMethods;
	const MIDDLEWARES = [...middlewares];

	if (!validMethods.includes(METHOD)) throw new Error(`invalid method "${METHOD}" in "${path}"`);

	if (!ROUTE) throw new Error(`default function handler is required in "${path}"`);

	const methodInUse = result.installedRoutes.find((r) => {
		return r.method === METHOD.toUpperCase() && r.routePath === buildPath(path, file, settings);
	});

	if (methodInUse) throw new Error(`method "${METHOD}" is already in use for "${methodInUse.routePath}"`);

	if (MIDDLEWARE) {
		const middlewares = await MIDDLEWARE(settings.payload || {});
		MIDDLEWARES.push(...middlewares);
	}

	if (middlewareFileResult[METHOD.toUpperCase()]) {
		const middlewares = await middlewareFileResult[METHOD.toUpperCase()](settings.payload || {});
		MIDDLEWARES.push(...middlewares);
	}

	app[METHOD](
		buildPath(path, file, settings),
		...wrapInHandler(MIDDLEWARES),
		asyncHandler(async (request, response, next) => {
			return ROUTE({ next, request, response, payload: settings.payload || {} });
		})
	);

	result.installedRoutes.push({
		routePath: buildPath(path, file, settings),
		path,
		method: METHOD.toUpperCase(),
		middlewares: cloneDeep(MIDDLEWARES)
	});

	if (shouldUse(settings.loggings?.logRoutings)) {
		console.info(`[${METHOD.toUpperCase()}]: ${buildPath(path, file, settings)}`);
	}
}
