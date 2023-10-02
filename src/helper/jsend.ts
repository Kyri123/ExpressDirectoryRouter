export enum ResponseStatus {
	Success = 'success',
	Fail = 'fail',
	Error = 'error'
}

export type JSendObjectError<Status extends ResponseStatus, T = any> = {
	data?: any;
	message: string;
	code: number;
	path: string;
};

export type JSendObjectResult<Status extends ResponseStatus, T = any> = {
	data: any;
	path?: string;
};

export type JSendObject<Status extends ResponseStatus, T = any> = { status: Status } & (Status extends ResponseStatus.Success | ResponseStatus.Fail
	? JSendObjectResult<Status, T>
	: JSendObjectError<Status, T>);

/**
 * just a helper function to create a jsend object in typescript
 * @see https://github.com/omniti-labs/jsend
 * @param data  the data to send
 * @param status  the status of the response
 * @returns  the jsend object
 */
export function jsend<Status extends ResponseStatus, T = any>(status: Status, data: Omit<JSendObject<Status, T>, 'status'>): JSendObject<Status, T> {
	return {
		...data,
		status
	} as JSendObject<Status, T>;
}
