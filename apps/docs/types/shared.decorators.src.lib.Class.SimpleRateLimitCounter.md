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

[gdg-fsc-workspace](../wiki/modules) / [shared/decorators/src/lib](../wiki/shared.decorators.src.lib) / SimpleRateLimitCounter

# Class: SimpleRateLimitCounter

Defined in: [packages/shared/decorators/src/lib/rate-limit/simple-rate-limit-counter.ts:25](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/decorators/src/lib/rate-limit/simple-rate-limit-counter.ts#L25)

## Implements

- [`RateLimitCounter`](../wiki/shared.decorators.src.lib.Interface.RateLimitCounter)

## Constructors

### Constructor

> **new SimpleRateLimitCounter**(`counterMap`): `SimpleRateLimitCounter`

Defined in: [packages/shared/decorators/src/lib/rate-limit/simple-rate-limit-counter.ts:26](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/decorators/src/lib/rate-limit/simple-rate-limit-counter.ts#L26)

#### Parameters

##### counterMap

`Map`\<`string`, `number`\> = `...`

#### Returns

`SimpleRateLimitCounter`

## Methods

### dec()

> **dec**(`key`): `void`

Defined in: [packages/shared/decorators/src/lib/rate-limit/simple-rate-limit-counter.ts:40](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/decorators/src/lib/rate-limit/simple-rate-limit-counter.ts#L40)

#### Parameters

##### key

`string`

#### Returns

`void`

#### Implementation of

[`RateLimitCounter`](../wiki/shared.decorators.src.lib.Interface.RateLimitCounter).[`dec`](../wiki/shared.decorators.src.lib.Interface.RateLimitCounter#dec)

***

### getCount()

> **getCount**(`key`): `number`

Defined in: [packages/shared/decorators/src/lib/rate-limit/simple-rate-limit-counter.ts:28](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/decorators/src/lib/rate-limit/simple-rate-limit-counter.ts#L28)

#### Parameters

##### key

`string`

#### Returns

`number`

#### Implementation of

[`RateLimitCounter`](../wiki/shared.decorators.src.lib.Interface.RateLimitCounter).[`getCount`](../wiki/shared.decorators.src.lib.Interface.RateLimitCounter#getcount)

***

### inc()

> **inc**(`key`): `void`

Defined in: [packages/shared/decorators/src/lib/rate-limit/simple-rate-limit-counter.ts:32](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/decorators/src/lib/rate-limit/simple-rate-limit-counter.ts#L32)

#### Parameters

##### key

`string`

#### Returns

`void`

#### Implementation of

[`RateLimitCounter`](../wiki/shared.decorators.src.lib.Interface.RateLimitCounter).[`inc`](../wiki/shared.decorators.src.lib.Interface.RateLimitCounter#inc)
