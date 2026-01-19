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

[gdg-fsc-workspace](../wiki/modules) / [shared/utils/src/lib](../wiki/shared.utils.src.lib) / fetcher

# Function: fetcher()

Enhanced data fetching utility with type safety, Effect Schema validation, and Effect-based error handling.
Supports retries, timeouts, custom headers, runtime validation, and error handling.

## Template

## Param

The URL to request

## Param

The HTTP method to use

## Param

Optional fetcher configuration including Effect Schema

## Param

Optional query parameters

## Param

Optional request body (for methods that support it)

## Example

```ts
import { Schema } from 'effect';

const UserSchema = Schema.Struct({
  id: Schema.Number,
  name: Schema.String,
  email: Schema.String
});

const effect = pipe(
  get("/api/user/123", {
    retries: 1,
    retryDelay: 1_000,
    timeout: 10_000,
    schema: UserSchema,
    onError: (error) => {
      if (error instanceof ValidationError) {
        console.error("Validation failed:", error.getProblemsString())
      }
    }
  }),
  Effect.provide(HttpClient.layer)
)
```

## Call Signature

> **fetcher**\<`T`\>(`input`, `method?`, `options?`, `params?`): `Effect`\<`T`, [`ValidationError`](../wiki/shared.utils.src.lib.Class.ValidationError) \| [`FetcherError`](../wiki/shared.utils.src.lib.Class.FetcherError), `HttpClient`\>

Defined in: [packages/shared/utils/src/lib/fetcher.ts:450](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/fetcher.ts#L450)

Performs a GET request with optional schema validation.

### Type Parameters

#### T

`T` = `unknown`

### Parameters

#### input

`string`

#### method?

`"GET"`

#### options?

[`FetcherOptions`](../wiki/shared.utils.src.lib.Interface.FetcherOptions)\<`T`\>

#### params?

### Returns

`Effect`\<`T`, [`ValidationError`](../wiki/shared.utils.src.lib.Class.ValidationError) \| [`FetcherError`](../wiki/shared.utils.src.lib.Class.FetcherError), `HttpClient`\>

## Call Signature

> **fetcher**\<`S`\>(`input`, `method`, `options`, `params?`): `Effect`\<`Type`\<`S`\>, [`ValidationError`](../wiki/shared.utils.src.lib.Class.ValidationError) \| [`FetcherError`](../wiki/shared.utils.src.lib.Class.FetcherError), `HttpClient`\>

Defined in: [packages/shared/utils/src/lib/fetcher.ts:460](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/fetcher.ts#L460)

Performs a GET request with Effect schema validation and automatic type inference.

### Type Parameters

#### S

`S` *extends* `Schema`\<`Any`, `Any`, `never`\>

### Parameters

#### input

`string`

#### method

`"GET"`

#### options

[`FetcherOptions`](../wiki/shared.utils.src.lib.Interface.FetcherOptions)\<`Type`\<`S`\>\> & `object`

#### params?

### Returns

`Effect`\<`Type`\<`S`\>, [`ValidationError`](../wiki/shared.utils.src.lib.Class.ValidationError) \| [`FetcherError`](../wiki/shared.utils.src.lib.Class.FetcherError), `HttpClient`\>

## Call Signature

> **fetcher**\<`T`\>(`input`, `method`, `options?`, `params?`, `body?`): `Effect`\<`T`, [`ValidationError`](../wiki/shared.utils.src.lib.Class.ValidationError) \| [`FetcherError`](../wiki/shared.utils.src.lib.Class.FetcherError), `HttpClient`\>

Defined in: [packages/shared/utils/src/lib/fetcher.ts:470](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/fetcher.ts#L470)

Performs a POST, PUT, or PATCH request with a request body and optional schema validation.

### Type Parameters

#### T

`T` = `unknown`

### Parameters

#### input

`string`

#### method

`"POST"` | `"PUT"` | `"PATCH"`

#### options?

[`FetcherOptions`](../wiki/shared.utils.src.lib.Interface.FetcherOptions)\<`T`\>

#### params?

#### body?

`string` | `number` | `boolean` | readonly `unknown`[] | \{\[`key`: `string`\]: `unknown`; \} | `null`

### Returns

`Effect`\<`T`, [`ValidationError`](../wiki/shared.utils.src.lib.Class.ValidationError) \| [`FetcherError`](../wiki/shared.utils.src.lib.Class.FetcherError), `HttpClient`\>

## Call Signature

> **fetcher**\<`S`\>(`input`, `method`, `options`, `params?`, `body?`): `Effect`\<`Type`\<`S`\>, [`ValidationError`](../wiki/shared.utils.src.lib.Class.ValidationError) \| [`FetcherError`](../wiki/shared.utils.src.lib.Class.FetcherError), `HttpClient`\>

Defined in: [packages/shared/utils/src/lib/fetcher.ts:481](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/fetcher.ts#L481)

Performs a POST, PUT, or PATCH request with Effect schema validation and automatic type inference.

### Type Parameters

#### S

`S` *extends* `Schema`\<`Any`, `Any`, `never`\>

### Parameters

#### input

`string`

#### method

`"POST"` | `"PUT"` | `"PATCH"`

#### options

[`FetcherOptions`](../wiki/shared.utils.src.lib.Interface.FetcherOptions)\<`Type`\<`S`\>\> & `object`

#### params?

#### body?

`string` | `number` | `boolean` | readonly `unknown`[] | \{\[`key`: `string`\]: `unknown`; \} | `null`

### Returns

`Effect`\<`Type`\<`S`\>, [`ValidationError`](../wiki/shared.utils.src.lib.Class.ValidationError) \| [`FetcherError`](../wiki/shared.utils.src.lib.Class.FetcherError), `HttpClient`\>

## Call Signature

> **fetcher**\<`T`\>(`input`, `method`, `options?`, `params?`): `Effect`\<`T`, [`ValidationError`](../wiki/shared.utils.src.lib.Class.ValidationError) \| [`FetcherError`](../wiki/shared.utils.src.lib.Class.FetcherError), `HttpClient`\>

Defined in: [packages/shared/utils/src/lib/fetcher.ts:492](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/fetcher.ts#L492)

Performs a DELETE, OPTIONS, or HEAD request with optional schema validation.

### Type Parameters

#### T

`T` = `unknown`

### Parameters

#### input

`string`

#### method

`"DELETE"` | `"OPTIONS"` | `"HEAD"`

#### options?

[`FetcherOptions`](../wiki/shared.utils.src.lib.Interface.FetcherOptions)\<`T`\>

#### params?

### Returns

`Effect`\<`T`, [`ValidationError`](../wiki/shared.utils.src.lib.Class.ValidationError) \| [`FetcherError`](../wiki/shared.utils.src.lib.Class.FetcherError), `HttpClient`\>
