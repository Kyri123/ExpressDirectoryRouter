import { jsend, ResponseStatus, type RoutingFunction } from '@dist/index';

const handler: RoutingFunction = async ({ response }) => {
	response.status(200).json(
		jsend(ResponseStatus.Success, {
			data: { message: 'Hello World' }
		})
	);
};

export default handler;
