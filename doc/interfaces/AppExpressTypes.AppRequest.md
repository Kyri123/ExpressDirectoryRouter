[@kyri123/express-app-router](../README.md) / [Exports](../modules.md) / [AppExpressTypes](../modules/AppExpressTypes.md) / AppRequest

# Interface: AppRequest<Params, ReqBody, ReqQuery\>

[AppExpressTypes](../modules/AppExpressTypes.md).AppRequest

overwrite Types here for global use

**`Example`**

```ts
declare global {
  namespace AppRequest {
    interface Payload {
  	 upload: string;
  	 app: string;
  	 config: string;
    }
  }
}
```

## Type parameters

| Name | Type |
| :------ | :------ |
| `Params` | extends `core.ParamsDictionary` = `core.ParamsDictionary` |
| `ReqBody` | `any` |
| `ReqQuery` | extends `core.Query` = `core.Query` |

## Hierarchy

- `Request`

  ↳ **`AppRequest`**

## Table of contents

### Properties

- [body](AppExpressTypes.AppRequest.md#body)
- [params](AppExpressTypes.AppRequest.md#params)
- [query](AppExpressTypes.AppRequest.md#query)

## Properties

### body

• **body**: `ReqBody`

#### Overrides

express.Request.body

#### Defined in

[types/globals.ts:53](https://github.com/Kyri123/ExpressDirectoryRouter/blob/da3dbf3/src/types/globals.ts#L53)

___

### params

• **params**: `Params`

#### Overrides

express.Request.params

#### Defined in

[types/globals.ts:52](https://github.com/Kyri123/ExpressDirectoryRouter/blob/da3dbf3/src/types/globals.ts#L52)

___

### query

• **query**: `ReqQuery`

#### Overrides

express.Request.query

#### Defined in

[types/globals.ts:54](https://github.com/Kyri123/ExpressDirectoryRouter/blob/da3dbf3/src/types/globals.ts#L54)
