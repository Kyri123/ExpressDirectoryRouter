import type { MiddleWareInit } from '@dist/types';

const POST: MiddleWareInit = async (payload) => {
	return [
		(req, res, next) => {
			return next();
		}
	];
};

export { POST };
