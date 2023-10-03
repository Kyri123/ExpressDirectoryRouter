[@kyri123/express-app-router](README.md) / Exports

# @kyri123/express-app-router

## Table of contents

### Namespaces

-   [AppExpressTypes](modules/AppExpressTypes.md)

### Enumerations

-   [ResponseStatus](enums/ResponseStatus.md)

### Classes

-   [ApiError](classes/ApiError.md)

### Type Aliases

-   [AppExpressInstallResult](modules.md#appexpressinstallresult)
-   [AppExpressRouteResult](modules.md#appexpressrouteresult)
-   [AppExpressSettings](modules.md#appexpresssettings)
-   [ExpressApp](modules.md#expressapp)
-   [JSendObject](modules.md#jsendobject)
-   [JSendObjectError](modules.md#jsendobjecterror)
-   [JSendObjectResult](modules.md#jsendobjectresult)
-   [MiddleWareInit](modules.md#middlewareinit)
-   [MiddlewareFunction](modules.md#middlewarefunction)
-   [MiddlewareFunctionHandler](modules.md#middlewarefunctionhandler)
-   [MiddlewareFunctionQuery](modules.md#middlewarefunctionquery)
-   [RouteQuery](modules.md#routequery)
-   [RoutingFunction](modules.md#routingfunction)
-   [ValidMethods](modules.md#validmethods)

### Variables

-   [validMethods](modules.md#validmethods-1)

### Functions

-   [asyncHandler](modules.md#asynchandler)
-   [installAppExpress](modules.md#installappexpress)
-   [jsend](modules.md#jsend)
-   [wrapInHandler](modules.md#wrapinhandler)

## Type Aliases

### AppExpressInstallResult

Ƭ **AppExpressInstallResult**: `Object`

Result for the installAppExpress function

**`Param`**

if true, the cookieParser is installed

**`Param`**

the middlewares that installed to the root of the app

**`Param`**

the routes that installed to the app

**`Param`**

if true, the errorHandler is installed

**`Param`**

if true, the notFoundHandler is installed

#### Type declaration

| Name                | Type                                                          |
| :------------------ | :------------------------------------------------------------ |
| `cookieParser`      | `boolean`                                                     |
| `errorHandler`      | `boolean`                                                     |
| `globalMiddlewares` | [`MiddlewareFunction`](modules.md#middlewarefunction)[]       |
| `installedRoutes`   | [`AppExpressRouteResult`](modules.md#appexpressrouteresult)[] |
| `notFoundHandler`   | `boolean`                                                     |

#### Defined in

[types/settings.ts:61](https://github.com/Kyri123/ExpressDirectoryRouter/blob/3b75a2d/src/types/settings.ts#L61)

---

### AppExpressRouteResult

Ƭ **AppExpressRouteResult**: `Object`

Installed route result

**`Param`**

the path of the route

**`Param`**

the path of the file

**`Param`**

the method of the route

**`Param`**

the middlewares that installed to the route

#### Type declaration

| Name          | Type                                                    |
| :------------ | :------------------------------------------------------ |
| `method`      | `string`                                                |
| `middlewares` | [`MiddlewareFunction`](modules.md#middlewarefunction)[] |
| `path`        | `string`                                                |
| `routePath`   | `string`                                                |

#### Defined in

[types/settings.ts:46](https://github.com/Kyri123/ExpressDirectoryRouter/blob/3b75a2d/src/types/settings.ts#L46)

---

### AppExpressSettings

Ƭ **AppExpressSettings**: `Object`

Settings for the AppExpress

**`Param`**

the payload for the app

**`Param`**

the source folder for the app (should be absolute path)

**`Param`**

if true, the cookieParser will be added

**`Param`**

if true, the errorHandler will be added

**`Param`**

if set, the globalMiddlewares that provided by the function will be added to the root of the app

**`Param`**

if true, the notFoundHandler will be added

**`Param`**

if set, the notFoundHandler will be added with the function

**`Param`**

if true, the routings will be logged

**`Param`**

if true, the error will be logged in the catch block

**`Param`**

if true, the zod error will be resolved

**`Param`**

if set, the format of the error will be overwritten

#### Type declaration

| Name | Type |
| :-- | :-- |
| `errorHandler?` | { `overwriteFormat?`: (`error`: [`ApiError`](classes/ApiError.md) \| `Error` \| `ZodError`) => `object` ; `resolveZodError?`: `boolean` } |
| `errorHandler.overwriteFormat?` | (`error`: [`ApiError`](classes/ApiError.md) \| `Error` \| `ZodError`) => `object` |
| `errorHandler.resolveZodError?` | `boolean` |
| `loggings?` | { `logInCatch?`: `boolean` ; `logRoutings?`: `boolean` } |
| `loggings.logInCatch?` | `boolean` |
| `loggings.logRoutings?` | `boolean` |
| `middlewares?` | { `cookieParser?`: `boolean` ; `errorHandler?`: `boolean` ; `globalMiddlewares?`: (`payload`: [`Payload`](interfaces/AppExpressTypes.Payload.md)) => [`MiddlewareFunction`](modules.md#middlewarefunction)[] \| `Promise`<[`MiddlewareFunction`](modules.md#middlewarefunction)[]\> ; `notFoundHandler?`: `boolean` ; `notFoundHandlerFunction`: [`RoutingFunction`](modules.md#routingfunction) } |
| `middlewares.cookieParser?` | `boolean` |
| `middlewares.errorHandler?` | `boolean` |
| `middlewares.globalMiddlewares?` | (`payload`: [`Payload`](interfaces/AppExpressTypes.Payload.md)) => [`MiddlewareFunction`](modules.md#middlewarefunction)[] \| `Promise`<[`MiddlewareFunction`](modules.md#middlewarefunction)[]\> |
| `middlewares.notFoundHandler?` | `boolean` |
| `middlewares.notFoundHandlerFunction` | [`RoutingFunction`](modules.md#routingfunction) |
| `payload?` | [`Payload`](interfaces/AppExpressTypes.Payload.md) |
| `source?` | `string` |

#### Defined in

[types/settings.ts:19](https://github.com/Kyri123/ExpressDirectoryRouter/blob/3b75a2d/src/types/settings.ts#L19)

---

### ExpressApp

Ƭ **ExpressApp**: `express.Application` \| `express.Router`

Type for the express app or router

**`Example`**

```ts
const app: ExpressApp = express();
```

#### Defined in

[types/func.ts:72](https://github.com/Kyri123/ExpressDirectoryRouter/blob/3b75a2d/src/types/func.ts#L72)

---

### JSendObject

Ƭ **JSendObject**<`Status`, `T`\>: { `status`: `Status` } & `Status` extends [`Success`](enums/ResponseStatus.md#success) \| [`Fail`](enums/ResponseStatus.md#fail) ? [`JSendObjectResult`](modules.md#jsendobjectresult)<`Status`, `T`\> : [`JSendObjectError`](modules.md#jsendobjecterror)<`Status`, `T`\>

JSend Object this is not a real jsend object we add 'path' to the error object also an optional if the Status is success or fail the data is required (JSendObjectResult) otherwise the message is required (JSendObjectError)

**`See`**

https://github.com/omniti-labs/jsend

#### Type parameters

| Name     | Type                                                |
| :------- | :-------------------------------------------------- |
| `Status` | extends [`ResponseStatus`](enums/ResponseStatus.md) |
| `T`      | `any`                                               |

#### Defined in

[helper/jsend.ts:44](https://github.com/Kyri123/ExpressDirectoryRouter/blob/3b75a2d/src/helper/jsend.ts#L44)

---

### JSendObjectError

Ƭ **JSendObjectError**<`Status`, `T`\>: `Object`

JSend Object Result for Error this is not a real jsend object we add 'path' to the error object also an optional

**`See`**

https://github.com/omniti-labs/jsend

#### Type parameters

| Name     | Type                                                |
| :------- | :-------------------------------------------------- |
| `Status` | extends [`ResponseStatus`](enums/ResponseStatus.md) |
| `T`      | `any`                                               |

#### Type declaration

| Name      | Type     |
| :-------- | :------- |
| `code`    | `number` |
| `data?`   | `any`    |
| `message` | `string` |
| `path`    | `string` |

#### Defined in

[helper/jsend.ts:19](https://github.com/Kyri123/ExpressDirectoryRouter/blob/3b75a2d/src/helper/jsend.ts#L19)

---

### JSendObjectResult

Ƭ **JSendObjectResult**<`Status`, `T`\>: `Object`

JSend Object Result for success and fail this is not a real jsend object we add 'path' to the error object also an optional

**`See`**

https://github.com/omniti-labs/jsend

#### Type parameters

| Name     | Type                                                |
| :------- | :-------------------------------------------------- |
| `Status` | extends [`ResponseStatus`](enums/ResponseStatus.md) |
| `T`      | `any`                                               |

#### Type declaration

| Name    | Type            |
| :------ | :-------------- |
| `data`  | `any` \| `null` |
| `path?` | `string`        |

#### Defined in

[helper/jsend.ts:31](https://github.com/Kyri123/ExpressDirectoryRouter/blob/3b75a2d/src/helper/jsend.ts#L31)

---

### MiddleWareInit

Ƭ **MiddleWareInit**: (`payload`: [`Payload`](interfaces/AppExpressTypes.Payload.md)) => [`MiddlewareFunction`](modules.md#middlewarefunction)[] \| `Promise`<[`MiddlewareFunction`](modules.md#middlewarefunction)[]\>

#### Type declaration

▸ (`payload`): [`MiddlewareFunction`](modules.md#middlewarefunction)[] \| `Promise`<[`MiddlewareFunction`](modules.md#middlewarefunction)[]\>

Type for the init function of the middleware this will be used in the middleware query

##### Parameters

| Name      | Type                                               |
| :-------- | :------------------------------------------------- |
| `payload` | [`Payload`](interfaces/AppExpressTypes.Payload.md) |

##### Returns

[`MiddlewareFunction`](modules.md#middlewarefunction)[] \| `Promise`<[`MiddlewareFunction`](modules.md#middlewarefunction)[]\>

**`Example`**

```ts
const middleware: MiddleWareInit = (payload) => {
	return [
		async (request, response, next) => {
			next();
		}
	];
};
```

#### Defined in

[types/func.ts:45](https://github.com/Kyri123/ExpressDirectoryRouter/blob/3b75a2d/src/types/func.ts#L45)

---

### MiddlewareFunction

Ƭ **MiddlewareFunction**<`Req`, `Res`\>: [`MiddlewareFunctionHandler`](modules.md#middlewarefunctionhandler)<`Req`, `Res`\> \| `express.RequestHandler`<`any`\>

Type for the middleware function this will be used in MiddleWareInit

**`Example`**

```ts
const middleware: MiddlewareFunction = async (request, response, next) => {
	next();
};
```

#### Type parameters

| Name  | Type                                                       |
| :---- | :--------------------------------------------------------- |
| `Req` | [`AppRequest`](interfaces/AppExpressTypes.AppRequest.md)   |
| `Res` | [`AppResponse`](interfaces/AppExpressTypes.AppResponse.md) |

#### Defined in

[types/func.ts:29](https://github.com/Kyri123/ExpressDirectoryRouter/blob/3b75a2d/src/types/func.ts#L29)

---

### MiddlewareFunctionHandler

Ƭ **MiddlewareFunctionHandler**<`Req`, `Res`\>: (`request`: `Req`, `response`: `Res`, `next`: `express.NextFunction`) => `Promise`<`any` \| `never`\>

#### Type parameters

| Name  | Type                                                       |
| :---- | :--------------------------------------------------------- |
| `Req` | [`AppRequest`](interfaces/AppExpressTypes.AppRequest.md)   |
| `Res` | [`AppResponse`](interfaces/AppExpressTypes.AppResponse.md) |

#### Type declaration

▸ (`request`, `response`, `next`): `Promise`<`any` \| `never`\>

alias type for MiddlewareFunction

##### Parameters

| Name       | Type                   |
| :--------- | :--------------------- |
| `request`  | `Req`                  |
| `response` | `Res`                  |
| `next`     | `express.NextFunction` |

##### Returns

`Promise`<`any` \| `never`\>

**`Example`**

```ts
const middleware: MiddlewareFunctionHandler = async (request, response, next) => {
	next();
};
```

#### Defined in

[types/func.ts:13](https://github.com/Kyri123/ExpressDirectoryRouter/blob/3b75a2d/src/types/func.ts#L13)

---

### MiddlewareFunctionQuery

Ƭ **MiddlewareFunctionQuery**: `Object`

functions to query the middleware like GET, POST, DELETE, ... GLOBAL is for the global middleware and will also applied to all routes in sub directories

**`Example`**

```ts
const middleware: MiddlewareFunctionQuery = {
	GLOBAL: (payload) => {
		return [
			async (request, response, next) => {
				next();
			}
		];
	},
	GET: (payload) => {
		return [
			async (request, response, next) => {
				next();
			}
		];
	}
};
```

#### Type declaration

| Name       | Type                                          |
| :--------- | :-------------------------------------------- |
| `ALL?`     | [`MiddleWareInit`](modules.md#middlewareinit) |
| `CONNECT?` | [`MiddleWareInit`](modules.md#middlewareinit) |
| `DELETE?`  | [`MiddleWareInit`](modules.md#middlewareinit) |
| `GET?`     | [`MiddleWareInit`](modules.md#middlewareinit) |
| `GLOBAL?`  | [`MiddleWareInit`](modules.md#middlewareinit) |
| `HEAD?`    | [`MiddleWareInit`](modules.md#middlewareinit) |
| `OPTIONS?` | [`MiddleWareInit`](modules.md#middlewareinit) |
| `POST?`    | [`MiddleWareInit`](modules.md#middlewareinit) |
| `PUT?`     | [`MiddleWareInit`](modules.md#middlewareinit) |
| `TRACE?`   | [`MiddleWareInit`](modules.md#middlewareinit) |

#### Defined in

[types/func.ts:94](https://github.com/Kyri123/ExpressDirectoryRouter/blob/3b75a2d/src/types/func.ts#L94)

---

### RouteQuery

Ƭ **RouteQuery**: `Object`

#### Type declaration

| Name          | Type                                            |
| :------------ | :---------------------------------------------- |
| `default?`    | [`RoutingFunction`](modules.md#routingfunction) |
| `middleware?` | [`MiddleWareInit`](modules.md#middlewareinit)   |

#### Defined in

[types/func.ts:107](https://github.com/Kyri123/ExpressDirectoryRouter/blob/3b75a2d/src/types/func.ts#L107)

---

### RoutingFunction

Ƭ **RoutingFunction**<`Req`, `Res`\>: (`handle`: { `error?`: `express.Errback` ; `next`: `express.NextFunction` ; `payload`: [`Payload`](interfaces/AppExpressTypes.Payload.md) ; `request`: `Req` ; `response`: `Res` }) => `Promise`<`any` \| `never`\> \| `any` \| `never`

#### Type parameters

| Name  | Type                                                       |
| :---- | :--------------------------------------------------------- |
| `Req` | [`AppRequest`](interfaces/AppExpressTypes.AppRequest.md)   |
| `Res` | [`AppResponse`](interfaces/AppExpressTypes.AppResponse.md) |

#### Type declaration

▸ (`handle`): `Promise`<`any` \| `never`\> \| `any` \| `never`

Type for the routing function like GET, POST, DELETE, ...

##### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `handle`          | `Object`                                           |
| `handle.error?`   | `express.Errback`                                  |
| `handle.next`     | `express.NextFunction`                             |
| `handle.payload`  | [`Payload`](interfaces/AppExpressTypes.Payload.md) |
| `handle.request`  | `Req`                                              |
| `handle.response` | `Res`                                              |

##### Returns

`Promise`<`any` \| `never`\> \| `any` \| `never`

**`Example`**

```ts
const route: RoutingFunction = async ({ request, response, next, payload }) => {
	response.send('Hello World');
};
```

#### Defined in

[types/func.ts:57](https://github.com/Kyri123/ExpressDirectoryRouter/blob/3b75a2d/src/types/func.ts#L57)

---

### ValidMethods

Ƭ **ValidMethods**: `"get"` \| `"post"` \| `"put"` \| `"delete"` \| `"all"` \| `"head"` \| `"connect"` \| `"options"` \| `"trace"` \| `"middleware"`

valid methods for the route

**`Example`**

```ts
const route: ValidMethods = 'get';
```

#### Defined in

[installer/const.ts:8](https://github.com/Kyri123/ExpressDirectoryRouter/blob/3b75a2d/src/installer/const.ts#L8)

## Variables

### validMethods

• `Const` **validMethods**: [`ValidMethods`](modules.md#validmethods)[]

valid methods for the route

#### Defined in

[installer/const.ts:13](https://github.com/Kyri123/ExpressDirectoryRouter/blob/3b75a2d/src/installer/const.ts#L13)

## Functions

### asyncHandler

▸ **asyncHandler**<`T`\>(`fn`): `T`

handle async functions in express and catch the errors to pass them to the error handler (NEXT)

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name | Type | Description          |
| :--- | :--- | :------------------- |
| `fn` | `T`  | the function to wrap |

#### Returns

`T`

the wrapped function

**`Function`**

asyncHandler

**`Example`**

```ts
const mittleware: RoutingFunction = asyncHandler(async ({ request, response, next, payload }) => {
	response.send('Hello World');
});
```

#### Defined in

[helper/asyncHandler.ts:16](https://github.com/Kyri123/ExpressDirectoryRouter/blob/3b75a2d/src/helper/asyncHandler.ts#L16)

---

### installAppExpress

▸ **installAppExpress**(`app`, `settings`): `Promise`<[`AppExpressInstallResult`](modules.md#appexpressinstallresult)\>

Install the app

#### Parameters

| Name       | Type                                                  | Description              |
| :--------- | :---------------------------------------------------- | :----------------------- |
| `app`      | [`ExpressApp`](modules.md#expressapp)                 | the express app          |
| `settings` | [`AppExpressSettings`](modules.md#appexpresssettings) | the settings for the app |

#### Returns

`Promise`<[`AppExpressInstallResult`](modules.md#appexpressinstallresult)\>

the result of the installation

**`Example`**

```ts
const app = express();
const settings: AppExpressSettings = {
	source: path.join(__dirname, 'routes'),
	middlewares: {
		cookieParser: true,
		errorHandler: true,
		notFoundHandler: true,
		globalMiddlewares: (payload) => {
			return [
				async (request, response, next) => {
					next();
				}
			];
		}
	},
	loggings: {
		logRoutings: true,
		logInCatch: true
	},
	errorHandler: {
		resolveZodError: true,
		overwriteFormat: (error) => {
			return {
				message: error.message,
				code: error.code,
				errors: error.errors
			};
		}
	}
};
```

#### Defined in

[installer/index.ts:43](https://github.com/Kyri123/ExpressDirectoryRouter/blob/3b75a2d/src/installer/index.ts#L43)

---

### jsend

▸ **jsend**<`Status`, `T`\>(`status`, `data`): [`JSendObject`](modules.md#jsendobject)<`Status`, `T`\>

just a helper function to create a jsend object in typescript this is not a real jsend object we add 'path' to the error object also an optional

#### Type parameters

| Name     | Type                                                |
| :------- | :-------------------------------------------------- |
| `Status` | extends [`ResponseStatus`](enums/ResponseStatus.md) |
| `T`      | `any`                                               |

#### Parameters

| Name     | Type                                                                         | Description                |
| :------- | :--------------------------------------------------------------------------- | :------------------------- |
| `status` | `Status`                                                                     | the status of the response |
| `data`   | `Omit`<[`JSendObject`](modules.md#jsendobject)<`Status`, `T`\>, `"status"`\> | the data to send           |

#### Returns

[`JSendObject`](modules.md#jsendobject)<`Status`, `T`\>

the jsend object

**`See`**

https://github.com/omniti-labs/jsend

#### Defined in

[helper/jsend.ts:56](https://github.com/Kyri123/ExpressDirectoryRouter/blob/3b75a2d/src/helper/jsend.ts#L56)

---

### wrapInHandler

▸ **wrapInHandler**(`fns`): `any`[]

wrap all functions in asyncHandler to catch errors in express

#### Parameters

| Name  | Type  | Description           |
| :---- | :---- | :-------------------- |
| `fns` | `any` | the functions to wrap |

#### Returns

`any`[]

the wrapped functions

**`Function`**

asyncHandler

**`Example`**

```ts
const mittlewares: RoutingFunction = wrapInHandler([
	async ({ request, response, next, payload }) => {
		response.send('Hello World');
	},
	async ({ request, response, next, payload }) => {
		response.send('Hello World');
	}
]);
```

#### Defined in

[helper/asyncHandler.ts:41](https://github.com/Kyri123/ExpressDirectoryRouter/blob/3b75a2d/src/helper/asyncHandler.ts#L41)
