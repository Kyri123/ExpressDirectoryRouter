import type { MiddleWareInit } from '@dist/index';

const GET: MiddleWareInit = async (payload) => {
	return [
		(req, res, next) => {
			return next();
		}
	];
};

export { GET };
