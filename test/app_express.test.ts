import { ResponseStatus, installAppExpress, jsend } from '@dist/index';
import { join } from 'path';
import request from 'supertest';
import { app, config } from './lib/test-base';

describe('JSend', () => {
	test('[Success] Should Match the default format', async () => {
		await expect(
			jsend(ResponseStatus.Success, {
				data: { message: 'Hello World' }
			})
		).toMatchObject({
			status: ResponseStatus.Success,
			data: { message: 'Hello World' }
		});
	});

	test('[Success] Should Match with path format', async () => {
		await expect(
			jsend(ResponseStatus.Success, {
				data: { message: 'Hello World' },
				path: '/test'
			})
		).toMatchObject({
			status: ResponseStatus.Success,
			data: { message: 'Hello World' },
			path: '/test'
		});
	});

	test('[Fail] Should Match the default format', async () => {
		await expect(
			jsend(ResponseStatus.Fail, {
				data: { message: 'Hello World' }
			})
		).toMatchObject({
			status: ResponseStatus.Fail,
			data: { message: 'Hello World' }
		});
	});

	test('[Fail] Should Match with path format', async () => {
		await expect(
			jsend(ResponseStatus.Fail, {
				data: { message: 'Hello World' },
				path: '/test'
			})
		).toMatchObject({
			status: ResponseStatus.Fail,
			data: { message: 'Hello World' },
			path: '/test'
		});
	});

	test('[Error] Should Match default format', async () => {
		await expect(
			jsend(ResponseStatus.Error, {
				path: '/test',
				message: 'test',
				code: 500
			})
		).toMatchObject({
			status: ResponseStatus.Error,
			message: 'test',
			code: 500,
			path: '/test'
		});
	});

	test('[Error] Should Match with data format', async () => {
		await expect(
			jsend(ResponseStatus.Error, {
				path: '/test',
				message: 'test',
				code: 500,
				data: { zod: [{ message: 'test1' }, { message: 'test2' }] }
			})
		).toMatchObject({
			status: ResponseStatus.Error,
			message: 'test',
			code: 500,
			path: '/test',
			data: { zod: [{ message: 'test1' }, { message: 'test2' }] }
		});
	});
});

describe('Settings', () => {
	test('should fail with missing express app', async () => {
		await expect(installAppExpress(undefined as any, config)).rejects.toThrowError('app is required');
	});

	test('should fail if the path is incorrect (not exsists)', async () => {
		config.source = join(__dirname, 'data', 'not-exsists');
		await expect(installAppExpress(app, config)).rejects.toThrowError('source path does not exist');
	});

	test('should fail if the path is incorrect (not a directory)', async () => {
		config.source = join(__dirname, 'data', 'not-a-directory');
		await expect(installAppExpress(app, config)).rejects.toThrowError('source path is not a directory');
	});
});

describe('Routing Installing', () => {
	test('should throw an error because a invalid method was found', async () => {
		config.source = join(__dirname, 'data', 'router-invalid-method');
		await expect(installAppExpress(app, config)).rejects.toThrowError(/invalid method/g);
	});

	test('should throw an error because a invalid file output was found', async () => {
		config.source = join(__dirname, 'data', 'router-invalid-output');
		await expect(installAppExpress(app, config)).rejects.toThrowError(/default function handler is required in/g);
	});

	test('should throw an error because a a route is duplicate', async () => {
		config.source = join(__dirname, 'data', 'router-duplicate');
		await expect(installAppExpress(app, config)).rejects.toThrowError(/is already in use for/g);
	});

	test('should not throw any error with correct path', async () => {
		config.source = join(__dirname, 'data', 'router');
		await expect(installAppExpress(app, config)).resolves.not.toThrowError();
	});
});

describe('Routing Validation', () => {
	const testing = [
		{ path: '/test', method: 'POST', should: true },
		{ path: '/test', method: 'GET', should: true },
		{ path: '/slug/:test', method: 'POST', should: true },
		{ path: '/slug/:test', method: 'GET', should: true },
		{ path: '/all/*', method: 'GET', should: true },
		{ path: '/slug-all/:test*', method: 'GET', should: true },
		{ path: '/(group)/slug/:test', method: 'POST', should: false },
		{ path: '/group/slug/:test', method: 'POST', should: false }
	];

	for (const { path, should, method } of testing) {
		test(`should ${should ? 'have' : 'NOT have'} a "${method}" on path "${path}"`, async () => {
			config.source = join(__dirname, 'data', 'router');

			const result = await installAppExpress(app, config);
			const route = result.installedRoutes.find((r) => {
				return r.routePath === path && r.method === method;
			});

			if (should) await expect(route).not.toBeUndefined();
			else await expect(route).toBeUndefined();
		});
	}
});

describe('Routing Fetch', () => {
	const testing = [
		{ path: '/test', method: 'POST', should: true },
		{ path: '/test', method: 'GET', should: true },
		{ path: '/slug/testparam', method: 'POST', should: true },
		{ path: '/slug/testparam', method: 'GET', should: true },
		{ path: '/all/testparam1/testparam2/testparam3', method: 'GET', should: true },
		{ path: '/slug-all/testparam', method: 'GET', should: true },
		{ path: '/slug-all/testparam1/testparam2', method: 'GET', should: true },
		{ path: '/slug-all/testparam/?test=testparam', method: 'GET', should: true },

		{ path: '/test', method: 'PUT', should: false },
		{ path: '/slug/testparam', method: 'DELETE', should: false },
		{ path: '/slug/testparam', method: 'PUT', should: false },
		{ path: '/all/testparam1/testparam2', method: 'DELETE', should: false },
		{ path: '/slug/testparam1/testparam2', method: 'POST', should: false },
		{ path: '/slug/testparam1/testparam2', method: 'GET', should: false },
		{ path: '/slug-all/testparam1/testparam2', method: 'PUT', should: false }
	];

	for (const { path, should, method } of testing) {
		test(`should Fetch a ${should ? 'success result' : 'failed result'} a "${method}" on path "${path}"`, async () => {
			config.source = join(__dirname, 'data', 'router');
			await installAppExpress(app, config).then(async () => {
				const http = app.listen(6668);

				const response = await request('http://localhost:6668')[method.toLowerCase()](path).set('Accept', 'application/json');
				http.close();

				if (should) {
					await expect(response.headers['content-type']).not.toBeUndefined();
					await expect(response.headers['content-type']).toMatch(/json/);
					await expect(response.statusCode).toBe(200);
					return expect(response.body).toMatchObject(
						jsend(ResponseStatus.Success, {
							data: { message: 'Hello World' }
						})
					);
				} else {
					await expect(response.headers['content-type']).not.toBeUndefined();
					await expect(response.headers['content-type']).toMatch(/json/);
					return expect(response.statusCode).not.toBe(200);
				}
			});
		});
	}
});

describe('Middlewares', () => {
	const testing = [
		{ path: '/test', method: 'POST', should: 1 },
		{ path: '/test', method: 'GET', should: 2 },
		{ path: '/slug/:test', method: 'POST', should: 1 },
		{ path: '/slug/:test', method: 'GET', should: 2 },
		{ path: '/all/*', method: 'GET', should: 1 },
		{ path: '/slug-all/:test*', method: 'GET', should: 1 }
	];

	for (const { path, should, method } of testing) {
		test(`Path "${path}" should have on method "${method}" ${should} middleware(s)`, async () => {
			const result = await installAppExpress(app, config);
			const route = result.installedRoutes.find((r) => {
				return r.routePath === path && r.method === method;
			});

			expect(route?.middlewares.length).toBe(should);
		});
	}
});
