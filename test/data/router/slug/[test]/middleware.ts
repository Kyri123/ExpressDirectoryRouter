import type { MiddleWareInit } from '@dist/types';

const GLOBAL: MiddleWareInit = async (payload) => {
	return [
		(req, res, next) => {
			return next();
		}
	];
};

const WILDCARD: MiddleWareInit = async (payload) => {
	return [
		(req, res, next) => {
			return next();
		}
	];
};

export { GLOBAL, WILDCARD };
