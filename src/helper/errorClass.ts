import { ResponseStatus } from './jsend';

/**
 * Custom error class for API errors
 * they are thrown by the backend and help to identify the status code
 */
export class ApiError extends Error {
	public readonly errCode: number;
	public readonly status: ResponseStatus;

	/**
	 * @param errCode the error code
	 * @param message the error message
	 * @param status the status of the error
	 */
	constructor(errCode: number, message: string, status: ResponseStatus = ResponseStatus.Error) {
		super(message);
		this.status = status;
		this.errCode = errCode;
	}
}
