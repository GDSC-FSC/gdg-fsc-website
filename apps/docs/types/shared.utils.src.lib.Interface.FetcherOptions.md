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

[gdg-fsc-workspace](../wiki/modules) / [shared/utils/src/lib](../wiki/shared.utils.src.lib) / FetcherOptions

# Interface: FetcherOptions\<T\>

Defined in: [packages/shared/utils/src/lib/fetcher.ts:23](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/fetcher.ts#L23)

Configuration options for the fetcher utility.

## Type Parameters

### T

`T` = `unknown`

## Properties

### bodyType?

> `optional` **bodyType**: `"json"` \| `"text"`

Defined in: [packages/shared/utils/src/lib/fetcher.ts:40](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/fetcher.ts#L40)

Body type - defaults to 'json', use 'text' for form-encoded data

***

### headers?

> `optional` **headers**: `Record`\<`string`, `string`\>

Defined in: [packages/shared/utils/src/lib/fetcher.ts:33](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/fetcher.ts#L33)

Additional headers to include in the request

***

### onError()?

> `optional` **onError**: (`error`) => `void`

Defined in: [packages/shared/utils/src/lib/fetcher.ts:29](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/fetcher.ts#L29)

Optional callback invoked on error

#### Parameters

##### error

`unknown`

#### Returns

`void`

***

### retries?

> `optional` **retries**: `number`

Defined in: [packages/shared/utils/src/lib/fetcher.ts:25](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/fetcher.ts#L25)

Number of times to retry the request on failure

***

### retryDelay?

> `optional` **retryDelay**: `number`

Defined in: [packages/shared/utils/src/lib/fetcher.ts:27](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/fetcher.ts#L27)

Delay in milliseconds between retries

***

### schema?

> `optional` **schema**: `Schema`\<`T`, `any`, `never`\>

Defined in: [packages/shared/utils/src/lib/fetcher.ts:36](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/fetcher.ts#L36)

Effect/Schema for runtime validation of the response

***

### signal?

> `optional` **signal**: `AbortSignal`

Defined in: [packages/shared/utils/src/lib/fetcher.ts:38](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/fetcher.ts#L38)

Abortsignal

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [packages/shared/utils/src/lib/fetcher.ts:31](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/fetcher.ts#L31)

Timeout in milliseconds for the request
