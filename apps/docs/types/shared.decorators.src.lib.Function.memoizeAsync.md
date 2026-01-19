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

[gdg-fsc-workspace](../wiki/modules) / [shared/decorators/src/lib](../wiki/shared.decorators.src.lib) / memoizeAsync

# Function: memoizeAsync()

## Call Signature

> **memoizeAsync**\<`T`, `D`\>(): [`AsyncMemoizable`](../wiki/shared.decorators.src.lib.TypeAlias.AsyncMemoizable)\<`T`, `D`\>

Defined in: [packages/shared/decorators/src/lib/memoize-async/memoize-async.ts:27](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/decorators/src/lib/memoize-async/memoize-async.ts#L27)

### Type Parameters

#### T

`T` = `any`

#### D

`D` = `any`

### Returns

[`AsyncMemoizable`](../wiki/shared.decorators.src.lib.TypeAlias.AsyncMemoizable)\<`T`, `D`\>

## Call Signature

> **memoizeAsync**\<`T`, `D`\>(`config`): [`AsyncMemoizable`](../wiki/shared.decorators.src.lib.TypeAlias.AsyncMemoizable)\<`T`, `D`\>

Defined in: [packages/shared/decorators/src/lib/memoize-async/memoize-async.ts:28](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/decorators/src/lib/memoize-async/memoize-async.ts#L28)

### Type Parameters

#### T

`T` = `any`

#### D

`D` = `any`

### Parameters

#### config

[`AsyncMemoizeConfig`](../wiki/shared.decorators.src.lib.Interface.AsyncMemoizeConfig)\<`T`, `D`\>

### Returns

[`AsyncMemoizable`](../wiki/shared.decorators.src.lib.TypeAlias.AsyncMemoizable)\<`T`, `D`\>

## Call Signature

> **memoizeAsync**\<`T`, `D`\>(`expirationTimeMs`): [`AsyncMemoizable`](../wiki/shared.decorators.src.lib.TypeAlias.AsyncMemoizable)\<`T`, `D`\>

Defined in: [packages/shared/decorators/src/lib/memoize-async/memoize-async.ts:31](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/decorators/src/lib/memoize-async/memoize-async.ts#L31)

### Type Parameters

#### T

`T` = `any`

#### D

`D` = `any`

### Parameters

#### expirationTimeMs

`number`

### Returns

[`AsyncMemoizable`](../wiki/shared.decorators.src.lib.TypeAlias.AsyncMemoizable)\<`T`, `D`\>
