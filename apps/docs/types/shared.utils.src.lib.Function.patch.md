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

[gdg-fsc-workspace](../wiki/modules) / [shared/utils/src/lib](../wiki/shared.utils.src.lib) / patch

# Function: patch()

## Call Signature

> **patch**\<`T`\>(`url`, `body?`, `options?`, `params?`): `Effect`\<`T`, [`ValidationError`](../wiki/shared.utils.src.lib.Class.ValidationError) \| [`FetcherError`](../wiki/shared.utils.src.lib.Class.FetcherError), `HttpClient`\>

Defined in: [packages/shared/utils/src/lib/fetcher.ts:751](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/fetcher.ts#L751)

Convenience function for PATCH requests with optional schema validation.

### Type Parameters

#### T

`T` = `unknown`

### Parameters

#### url

`string`

#### body?

`string` | `number` | `boolean` | readonly `unknown`[] | \{\[`key`: `string`\]: `unknown`; \} | `null`

#### options?

[`FetcherOptions`](../wiki/shared.utils.src.lib.Interface.FetcherOptions)\<`T`\>

#### params?

### Returns

`Effect`\<`T`, [`ValidationError`](../wiki/shared.utils.src.lib.Class.ValidationError) \| [`FetcherError`](../wiki/shared.utils.src.lib.Class.FetcherError), `HttpClient`\>

## Call Signature

> **patch**\<`S`\>(`url`, `body`, `options`, `params?`): `Effect`\<`Type`\<`S`\>, [`ValidationError`](../wiki/shared.utils.src.lib.Class.ValidationError) \| [`FetcherError`](../wiki/shared.utils.src.lib.Class.FetcherError), `HttpClient`\>

Defined in: [packages/shared/utils/src/lib/fetcher.ts:758](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/fetcher.ts#L758)

Convenience function for PATCH requests with optional schema validation.

### Type Parameters

#### S

`S` *extends* `Schema`\<`Any`, `Any`, `never`\>

### Parameters

#### url

`string`

#### body

`string` | `number` | `boolean` | readonly `unknown`[] | \{\[`key`: `string`\]: `unknown`; \} | `null`

#### options

[`FetcherOptions`](../wiki/shared.utils.src.lib.Interface.FetcherOptions)\<`Type`\<`S`\>\> & `object`

#### params?

### Returns

`Effect`\<`Type`\<`S`\>, [`ValidationError`](../wiki/shared.utils.src.lib.Class.ValidationError) \| [`FetcherError`](../wiki/shared.utils.src.lib.Class.FetcherError), `HttpClient`\>
