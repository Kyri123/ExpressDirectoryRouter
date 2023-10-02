import type express from 'express';

/**
 * overwrite Types here for global use
 * @example
 * declare global {
 *   namespace AppExpressTypes {
 * 	   interface Payload {
 * 		 upload: string;
 * 		 app: string;
 * 		 config: string;
 *     }
 *   }
 * }
 */
declare global {
	namespace AppExpressTypes {
		interface AppRequest extends express.Request {}
		interface AppResponse extends express.Response {}
		interface Payload {}
	}
}

export {};
