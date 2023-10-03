[@kyri123/express-app-router](../README.md) / [Exports](../modules.md) / [AppExpressTypes](../modules/AppExpressTypes.md) / Payload

# Interface: Payload

[AppExpressTypes](../modules/AppExpressTypes.md).Payload

overwrite Types here for global use

**`Example`**

```ts
declare global {
 namespace Payload {
	 interface Payload {
		 upload: string;
		 app: string;
		 config: string;
  }
}
```
