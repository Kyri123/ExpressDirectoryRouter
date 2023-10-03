/**
 * valid methods for the route
 * @example
 * ```ts
 * const route: ValidMethods = 'get';
 * ```
 */
export type ValidMethods = 'get' | 'post' | 'put' | 'delete' | 'all' | 'head' | 'connect' | 'options' | 'trace' | 'middleware';

/**
 * valid methods for the route
 */
export const validMethods: ValidMethods[] = ['get', 'post', 'put', 'delete', 'all', 'head', 'connect', 'options', 'trace', 'middleware'];
