[@kyri123/express-app-router](../README.md) / [Exports](../modules.md) / ApiError

# Class: ApiError

Custom error class for API errors they are thrown by the backend and help to identify the status code

## Hierarchy

-   `Error`

    ↳ **`ApiError`**

## Table of contents

### Constructors

-   [constructor](ApiError.md#constructor)

### Properties

-   [errCode](ApiError.md#errcode)
-   [status](ApiError.md#status)

## Constructors

### constructor

• **new ApiError**(`errCode`, `message`, `status?`)

#### Parameters

| Name      | Type                                           | Default value          | Description             |
| :-------- | :--------------------------------------------- | :--------------------- | :---------------------- |
| `errCode` | `number`                                       | `undefined`            | the error code          |
| `message` | `string`                                       | `undefined`            | the error message       |
| `status`  | [`ResponseStatus`](../enums/ResponseStatus.md) | `ResponseStatus.Error` | the status of the error |

#### Overrides

Error.constructor

#### Defined in

[helper/errorClass.ts:16](https://github.com/Kyri123/ExpressDirectoryRouter/blob/81355bd/src/helper/errorClass.ts#L16)

## Properties

### errCode

• `Readonly` **errCode**: `number`

#### Defined in

[helper/errorClass.ts:8](https://github.com/Kyri123/ExpressDirectoryRouter/blob/81355bd/src/helper/errorClass.ts#L8)

---

### status

• `Readonly` **status**: [`ResponseStatus`](../enums/ResponseStatus.md)

#### Defined in

[helper/errorClass.ts:9](https://github.com/Kyri123/ExpressDirectoryRouter/blob/81355bd/src/helper/errorClass.ts#L9)
