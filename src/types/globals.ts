import type express from 'express';
import type * as core from 'express-serve-static-core';

/**
 * overwrite Types here for global use
 * @example
 * ```ts
 * declare global {
 *   namespace AppExpressTypes {
 * 	   interface Payload {
 * 		 upload: string;
 * 		 app: string;
 * 		 config: string;
 *     }
 *   }
 * }
 * ```
 */
declare global {
	/**
	 * overwrite Types here for global use
	 * @example
	 * ```ts
	 * declare global {
	 *  namespace AppExpressTypes {
	 * 	 interface Payload {
	 * 		 upload: string;
	 * 		 app: string;
	 * 		 config: string;
	 *    }
	 * }
	 * ```
	 */
	namespace AppExpressTypes {
		/**
		 * overwrite Types here for global use
		 * @example
		 * ```ts
		 * declare global {
		 *   namespace AppRequest {
		 *     interface Payload {
		 *   	 upload: string;
		 *   	 app: string;
		 *   	 config: string;
		 *     }
		 *   }
		 * }
		 * ```
		 */
		interface AppRequest<Params extends core.ParamsDictionary = core.ParamsDictionary, ReqBody = any, ReqQuery extends core.Query = core.Query>
			extends express.Request {
			params: Params;
			body: ReqBody;
			query: ReqQuery;
		}

		/**
		 * overwrite Types here for global use
		 * @example
		 * ```ts
		 * declare global {
		 *  namespace AppResponse {
		 * 	 interface Payload {
		 * 		 upload: string;
		 * 		 app: string;
		 * 		 config: string;
		 *   }
		 * }
		 * ```
		 */
		interface AppResponse extends express.Response {}

		/**
		 * overwrite Types here for global use
		 * @example
		 * ```ts
		 * declare global {
		 *  namespace Payload {
		 * 	 interface Payload {
		 * 		 upload: string;
		 * 		 app: string;
		 * 		 config: string;
		 *   }
		 * }
		 * ```
		 */
		interface Payload {}
	}
}

export { AppExpressTypes };
