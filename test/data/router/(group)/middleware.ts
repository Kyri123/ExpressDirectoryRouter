import type { MiddleWareInit } from '@dist/index';

const POST: MiddleWareInit = async (payload) => {
	return [
		(req, res, next) => {
			return next();
		}
	];
};

export { POST };
