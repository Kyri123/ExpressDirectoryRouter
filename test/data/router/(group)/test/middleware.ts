import type { MiddleWareInit } from '@dist/types';

const GET: MiddleWareInit = async (payload) => {
	return [
		(req, res, next) => {
			return next();
		}
	];
};

export { GET };
