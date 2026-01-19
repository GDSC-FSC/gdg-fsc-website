<!--
  Copyright (c) 2026 GDG on Campus Farmingdale State College

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
-->

[gdg-fsc-workspace](../wiki/modules) / [shared/utils/src/lib](../wiki/shared.utils.src.lib) / createApiResponseSchema

# Function: createApiResponseSchema()

> **createApiResponseSchema**\<`T`, `I`\>(`dataSchema`): `Struct`\<\{ `data`: `Schema`\<`T`, `I`, `never`\>; `errors`: `optional`\<`Array$`\<*typeof* `String$`\>\>; `message`: `optional`\<*typeof* `String$`\>; `success`: *typeof* `Boolean$`; \}\>

Defined in: [packages/shared/utils/src/lib/fetcher.ts:883](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/fetcher.ts#L883)

Helper function to create an API response wrapper schema.

## Type Parameters

### T

`T`

### I

`I`

## Parameters

### dataSchema

`Schema`\<`T`, `I`, `never`\>

## Returns

`Struct`\<\{ `data`: `Schema`\<`T`, `I`, `never`\>; `errors`: `optional`\<`Array$`\<*typeof* `String$`\>\>; `message`: `optional`\<*typeof* `String$`\>; `success`: *typeof* `Boolean$`; \}\>

## Example

```ts
const UserSchema = Schema.Struct({
  id: Schema.Number,
  name: Schema.String
});

const WrappedUserSchema = createApiResponseSchema(UserSchema);

const effect = get("/api/user/123", {
  schema: WrappedUserSchema
});
```
