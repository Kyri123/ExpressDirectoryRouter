/**
 * JSend Status for the response
 * @param Success All went well, and (usually) some data was returned.
 * @param Fail There was a problem with the data submitted, or some pre-condition of the API call wasn't satisfied
 * @param Error An error occurred in processing the request, i.e. an exception was thrown
 * @see https://github.com/omniti-labs/jsend
 */
export enum ResponseStatus {
	Success = 'success',
	Fail = 'fail',
	Error = 'error'
}

/**
 * JSend Object Result for Error
 * this is not a real jsend object we add 'path' to the error object also an optional
 * @see https://github.com/omniti-labs/jsend
 */
export type JSendObjectError<Status extends ResponseStatus, T = any> = {
	data?: any;
	message: string;
	code: number;
	path: string;
};

/**
 * JSend Object Result for success and fail
 * this is not a real jsend object we add 'path' to the error object also an optional
 * @see https://github.com/omniti-labs/jsend
 */
export type JSendObjectResult<Status extends ResponseStatus, T = any> = {
	data: any | null;
	path?: string;
};

/**
 * JSend Object
 * this is not a real jsend object we add 'path' to the error object also an optional
 * if the Status is success or fail the data is required (JSendObjectResult) otherwise the message is required (JSendObjectError)
 * @see https://github.com/omniti-labs/jsend
 * @type JSendObjectResult<Status extends ResponseStatus, T = any>
 * @type JSendObjectError<Status extends ResponseStatus, T = any>
 */
export type JSendObject<Status extends ResponseStatus, T = any> = { status: Status } & (Status extends ResponseStatus.Success | ResponseStatus.Fail
	? JSendObjectResult<Status, T>
	: JSendObjectError<Status, T>);

/**
 * just a helper function to create a jsend object in typescript
 * this is not a real jsend object we add 'path' to the error object also an optional
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
