[@kyri123/express-app-router](../README.md) / [Exports](../modules.md) / [AppExpressTypes](../modules/AppExpressTypes.md) / AppResponse

# Interface: AppResponse

[AppExpressTypes](../modules/AppExpressTypes.md).AppResponse

overwrite Types here for global use

**`Example`**

```ts
declare global {
 namespace AppResponse {
	 interface Payload {
		 upload: string;
		 app: string;
		 config: string;
  }
}
```

## Hierarchy

- `Response`

  ↳ **`AppResponse`**
