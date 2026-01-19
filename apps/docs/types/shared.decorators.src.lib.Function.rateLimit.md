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

[gdg-fsc-workspace](../wiki/modules) / [shared/decorators/src/lib](../wiki/shared.decorators.src.lib) / rateLimit

# Function: rateLimit()

> **rateLimit**\<`T`\>(`config`): (`target`, `propertyName`, `descriptor`) => `TypedPropertyDescriptor`\<[`Method`](../wiki/shared.decorators.src.lib.TypeAlias.Method)\<`unknown`\>\>

Defined in: [packages/shared/decorators/src/lib/rate-limit/rate-limit.ts:42](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/decorators/src/lib/rate-limit/rate-limit.ts#L42)

Decorator that rate limits method calls.
Only allows a specified number of calls within a time globalThis.

## Type Parameters

### T

`T` = `unknown`

## Parameters

### config

[`RateLimitConfigs`](../wiki/shared.decorators.src.lib.Interface.RateLimitConfigs)\<`T`\>

Rate limit configuration

## Returns

The decorator function

> (`target`, `propertyName`, `descriptor`): `TypedPropertyDescriptor`\<[`Method`](../wiki/shared.decorators.src.lib.TypeAlias.Method)\<`unknown`\>\>

### Parameters

#### target

`T`

#### propertyName

keyof `T`

#### descriptor

`TypedPropertyDescriptor`\<[`Method`](../wiki/shared.decorators.src.lib.TypeAlias.Method)\<`unknown`\>\>

### Returns

`TypedPropertyDescriptor`\<[`Method`](../wiki/shared.decorators.src.lib.TypeAlias.Method)\<`unknown`\>\>

## Example

```ts
class Api {
  @rateLimit({ timeSpanMs: 1000, allowedCalls: 5 })
  fetchData() {
    // Only 5 calls allowed per second
  }
}
```
