[@kyri123/express-app-router](../README.md) / [Exports](../modules.md) / [AppExpressTypes](../modules/AppExpressTypes.md) / AppRequest

# Interface: AppRequest

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

## Hierarchy

-   `Request`

    ↳ **`AppRequest`**
