import { ResponseStatus } from './jsend';

/**
 * Custom error class for API errors
 * they are thrown by the backend and help to identify the status code
 * @param errCode -> the error code
 * @param message -> the error message
 */
export class ApiError extends Error {
	public readonly errCode: number;
	public readonly status: ResponseStatus;

	constructor(errCode: number, message: string, status: ResponseStatus = ResponseStatus.Error) {
		super(message);
		this.status = status;
		this.errCode = errCode;
	}
}
