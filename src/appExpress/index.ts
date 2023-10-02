/*import express from 'express';
import { ZodError } from 'zod';
import { ApiError } from '../helper/errorClass';
import type { AppExpressOptions } from './install';
import { startInstall } from './install';

declare global {
	namespace AppExpressTypes {
		interface AppRequest extends express.Request {}
		interface AppResponse extends express.Response {}
		interface Payload {}
	}
}

namespace AppExpress {
	export function installErrorHandling(
		app: express.Express,
		options: Pick<
			AppExpressOptions,
			'invalidPathMiddleware' | 'errorMiddleware' | 'logInCatch' | 'invalidPathText' | 'debug' | 'installCustomErrorHandler'
		>
	) {
		if (options.installCustomErrorHandler) {
			options.installCustomErrorHandler(app);
		}

		if (options.invalidPathMiddleware) {
			app.use('*', (req: any, res: any, next: any) => {
				next(new ApiError(404, options.invalidPathText || 'api route not found.'));
			});
		}

		if (options.errorMiddleware) {
			app.use((err, req, res, next) => {
				if (options.logInCatch) {
					if (options.debug) {
						console.error(err);
					} else if (err instanceof ZodError) {
						console.error(
							err.issues.map((e) => {
								return e.message;
							})
						);
					} else {
						console.error(err.message);
					}
				}
				if (err instanceof ZodError) {
					return res.status(400).json({
						error: 400,
						message: err.issues[0].message,
						path: req.path,
						zodStack: err.issues.map((e) => {
							return e.message;
						})
					});
				}
				if (err instanceof ApiError) {
					return res.status(err.errCode).json({ error: err.errCode, message: err.message, path: req.path });
				}
				res.status(500).json({ error: 500, message: err.message, path: req.path });
			});
		}
	}

	export function installHealthCheck(app: express.Express, { healthCheck }: AppExpressOptions) {
		app.get('/health', async (req, res) => {
			const soft = (req.query.mode as string) === 'soft';
			if (soft) {
				return res.status(200).json({
					success: true,
					time: new Date().toISOString(),
					timestamp: Date.now(),
					result: {
						healthy: true
					}
				});
			}
			try {
				const services = healthCheck ? await healthCheck() : [];
				const healthy =
					services.every((e) => {
						return e.healthy;
					}) || services.length === 0;
				return res.status(healthy ? 200 : 503).json({
					success: true,
					time: new Date().toISOString(),
					timestamp: Date.now(),
					result: healthCheck
						? await healthCheck()
						: {
								healthy,
								services
						  }
				});
			} catch (e: any) {
				res.status(500).json({ timestamp: Date.now(), time: new Date().toISOString(), success: false, error: e.message });
			}
		});
	}

	export async function install(app: express.Express, options: AppExpressOptions): Promise<express.Express> {
		const { invalidPathMiddleware = true, errorMiddleware = true } = options;
		if (!app) throw new Error('app is required');
		if (!options) throw new Error('options is required');
		if (options.logRoutings === undefined) options.logRoutings = true;
		installHealthCheck(app, options);
		await startInstall(app, options);
		installErrorHandling(app, { invalidPathMiddleware, errorMiddleware, ...options });
		return app;
	}

	export async function installRouter(app: express.Express, inPath: string, options: AppExpressOptions): Promise<express.Router> {
		const { invalidPathMiddleware = false, errorMiddleware = false } = options;
		if (!app) throw new Error('app is required');
		if (!options) throw new Error('options is required');
		const router = express.Router();
		if (options.logRoutings === undefined) options.logRoutings = true;
		await startInstall(router, options, inPath);
		installErrorHandling(app, { invalidPathMiddleware, errorMiddleware, ...options });
		app.use(inPath, router);
		return router;
	}

	export type MiddlewareFunctionHandler<Req = AppExpressTypes.AppRequest, Res = AppExpressTypes.AppResponse> = (
		request: Req,
		response: Res,
		next: express.NextFunction
	) => Promise<any | never>;

	export type MiddlewareFunction<Req = AppExpressTypes.AppRequest, Res = AppExpressTypes.AppResponse> =
		| MiddlewareFunctionHandler<Req, Res>
		| express.RequestHandler<any>;

	export type MiddleWareInit = (payload: AppExpressTypes.Payload) => MiddlewareFunction[] | Promise<MiddlewareFunction[]>;

	export type RoutingFunction<Req = AppExpressTypes.AppRequest, Res = AppExpressTypes.AppResponse> = (handle: {
		error: express.Errback;
		next: express.NextFunction;
		request: Req;
		response: Res;
		payload: AppExpressTypes.Payload;
	}) => Promise<any | never> | any | never;
}

export * from '../helper/errorClass';
export * from './asyncHandler';
export { App, AppExpressOptions, AppMethods, HealthCheck, allowedMethods } from './install';
export * from '../types/func';
export { AppExpress };
*/

/*import cookieParser from 'cookie-parser';
import type express from 'express';
import { existsSync } from 'fs';
import { readdir, stat } from 'fs/promises';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';
import { cloneDeep } from 'lodash';
import { join } from 'path';
import { useAuthV2, useAzureToken } from '../auth';
import { asyncHandler, wrapInHandler } from './asyncHandler';

export type App = express.Express | express.Router;

export type HealthCheck = {
	name: string;
	healthy: boolean;
}[];

export type AppMethods = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' | 'middleware' | 'routes';
export interface AppExpressOptions {
	searchPath: string;
	path?: string;
	payload: any;
	debug?: boolean;
	logRoutings?: boolean;
	errorMiddleware?: boolean;
	invalidPathMiddleware?: boolean;
	invalidPathText?: string;
	logInCatch?: boolean;
	disableUseAuth?: boolean;
	disableCookieParser?: boolean;
	checkCookie?: boolean;
	needAuth?: boolean;
	disableI18N?: boolean;
	importResolve?: (importFile: string) => Promise<any>;
	installCustomErrorHandler?: (app: App) => void;
	installCustomGlobalMiddleware?: (app: App) => void;
	healthCheck?: () => HealthCheck | Promise<HealthCheck>;
}

async function importAny(importFile: string, options: AppExpressOptions): Promise<any> {
	if (options.importResolve) return await options.importResolve(importFile);
	return await import(importFile.replace('.ts', '').replace('.js', ''));
}

export async function startInstall(app: App, { needAuth = false, checkCookie = false, ...options }: AppExpressOptions, inPath?: string) {
	// start install
	if (options.debug) console.info(`START INSTALL ${options.searchPath}`);
	if (!options.disableCookieParser) app.use(cookieParser());
	if (!options.disableUseAuth) {
		app.use(useAzureToken());
		app.use(useAuthV2({ needAuth }));
	}
	if (!options.disableI18N) {
		i18next
			.use(Backend)
			.use(i18nextMiddleware.LanguageDetector)
			.init({
				backend: {
					loadPath: join(process.cwd(), 'src', 'locales', '{{lng}}.yml')
				},
				detection: {
					lookupCookie: 'sic-lang',
					order: ['querystring', 'cookie']
				},
				fallbackLng: 'en',
				preload: ['en', 'de', 'pt', 'es'],
				debug: options.debug
			});
		app.use(i18nextMiddleware.handle(i18next));
	}

	if (options.installCustomGlobalMiddleware) {
		options.installCustomGlobalMiddleware(app);
	}

	await installRoutingInDir(app, options.searchPath, options, inPath);

	// install router in app
	if (options.debug) console.info(`INSTALL FINISHED ${options.searchPath}`);
}

export const allowedMethods: AppMethods[] = ['all', 'get', 'post', 'put', 'delete', 'patch', 'options', 'head', 'middleware', 'routes'];

export function convertPathToRoutPath(path: string, options: AppExpressOptions) {
	let newPath = join(
		join(options.path || '', path.replace(options.searchPath, '').replaceAll(/\((.*?)\)\//g, ''))
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

export async function installRoutingInDir(app: App, path: string, options: AppExpressOptions, inPath?: string, mwStack: any[] = []) {
	mwStack = cloneDeep(mwStack);
	if (options.debug) console.info(`DIR ${convertPathToRoutPath(path, options)}`);
	const files = await readdir(path);
	files.sort((a, b) => {
		const start = b.replaceAll('\\', '/').split('/')[0];
		if (start.includes('...')) {
			return -100000000;
		}
		if (start.startsWith('[') || start.startsWith('(')) {
			return -1;
		}
		return 1;
	});

	const mwFile = files.find((f) => {
		return f.startsWith('middleware');
	});
	if (mwFile) {
		const module = await importAny(join(path, mwFile), options).then((m) => {
			if (!m.GLOBAL) return undefined;
			return m.GLOBAL(options.payload || {});
		});
		if (module) {
			mwStack.push(...module);
		}
	}

	for (const file of files) {
		if (file.endsWith('.d.ts')) continue;
		const filePath = join(path, file);
		const stats = await stat(filePath);

		if (stats.isDirectory()) {
			await installRoutingInDir(app, filePath, options, inPath, mwStack);
		} else {
			if (options.debug) console.info(`FILE ${convertPathToRoutPath(filePath, options)}`);
			if (!file.includes('middleware')) {
				const middleWareFile = files.find((f) => {
					return f.split('.')[0] === 'middleware';
				});
				const routeFile = files.find((f) => {
					return f.split('.')[0] === 'routes';
				});
				if ((routeFile && routeFile.includes('routes')) || !routeFile) {
					await installRoutingInFile(app, path, file, options, middleWareFile, routeFile, inPath, mwStack);
				}
			}
		}
	}
}

export async function installRoutingInFile(
	app: App,
	path: string,
	file: string,
	options: AppExpressOptions,
	middleWareFile?: string,
	routeFile?: string,
	inPath?: string,
	mwStack: any[] = []
) {
	const mw: any = { middleware: [] };

	// set real path
	middleWareFile = middleWareFile ? join(path, middleWareFile) : undefined;
	routeFile = routeFile ? join(path, routeFile) : undefined;

	if (middleWareFile && existsSync(middleWareFile)) {
		const module = await importAny(middleWareFile, options);
		if (!module) throw new Error(`Could not import middleware file ${middleWareFile}`);

		mw.middleware.push(...(module.middleware ? await module.middleware(options.payload || {}) : []));
		mw.middleware.push(...(module.default ? await module.default(options.payload || {}) : []));
		for (const m of allowedMethods) {
			mw[m.toUpperCase()] = module[m.toUpperCase()] ? await module[m.toUpperCase()](options.payload || {}) : [];
		}
	}

	if (
		!allowedMethods.some((m) => {
			return file.startsWith(m);
		})
	)
		throw new Error(`File ${file} does not start with any of the allowed methods: ${allowedMethods.join(', ')}`);

	for (const m of allowedMethods) {
		if (file.startsWith(m) || !!routeFile) {
			const [fn, fnMiddle] = await importAny(join(path, file), options).then(async (module) => {
				const middels = typeof module.middleware === 'function' ? await module.middleware(options.payload || {}) : [];
				if (routeFile) {
					return [module[m.toUpperCase()], middels];
				}
				return [module?.default, middels];
			});
			if (!fn) {
				if (options.debug) {
					console.warn(`Could not import file '${join(path, file)}' for method '${m}'`);
				}
				continue;
			}
			if (path.trim() === '') path = '/';
			app[m.toLowerCase()](
				convertPathToRoutPath(path, options),
				//@ts-ignore
				...wrapInHandler(mwStack),
				...wrapInHandler(mw.middleware),
				...wrapInHandler(mw[m.toUpperCase()] || []),
				...wrapInHandler(fnMiddle || []),
				asyncHandler(async (request, response, next) => {
					return fn({ next, request, response, payload: options.payload || {} });
				})
			);
			if (options.debug) {
				console.info(`INSTALLED MIDDELWARES`, mwStack, mw.middleware, mw[m.toUpperCase()] || [], fnMiddle || []);
			}
			if (options.logRoutings) console.info(`${m.toUpperCase()} - ${inPath ? `"${inPath}"` : ''}${convertPathToRoutPath(path, options)}`);
			if (options.debug && !options.logRoutings)
				console.info(`INSTALLED: ${m.toUpperCase()} ${inPath ? `"${inPath}"` : ''}${convertPathToRoutPath(path, options)}`);
		}
	}
}
*/
