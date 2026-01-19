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

[gdg-fsc-workspace](../wiki/modules) / [shared/classes/src/lib](../wiki/shared.classes.src.lib) / ThreadPool

# Class: ThreadPool

Defined in: [packages/shared/classes/src/lib/thread-pool/thread-pool.ts:22](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/thread-pool/thread-pool.ts#L22)

## Constructors

### Constructor

> **new ThreadPool**(`workerScript`, `maxWorkers`): `ThreadPool`

Defined in: [packages/shared/classes/src/lib/thread-pool/thread-pool.ts:31](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/thread-pool/thread-pool.ts#L31)

#### Parameters

##### workerScript

`string`

##### maxWorkers

`number` = `...`

#### Returns

`ThreadPool`

## Methods

### getActiveTaskCount()

> **getActiveTaskCount**(): `number`

Defined in: [packages/shared/classes/src/lib/thread-pool/thread-pool.ts:143](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/thread-pool/thread-pool.ts#L143)

#### Returns

`number`

***

### getAllResults()

> **getAllResults**(): `Map`\<`string`, `WorkerResult`\>

Defined in: [packages/shared/classes/src/lib/thread-pool/thread-pool.ts:151](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/thread-pool/thread-pool.ts#L151)

#### Returns

`Map`\<`string`, `WorkerResult`\>

***

### getQueuedTaskCount()

> **getQueuedTaskCount**(): `number`

Defined in: [packages/shared/classes/src/lib/thread-pool/thread-pool.ts:147](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/thread-pool/thread-pool.ts#L147)

#### Returns

`number`

***

### shutdown()

> **shutdown**(): `void`

Defined in: [packages/shared/classes/src/lib/thread-pool/thread-pool.ts:132](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/thread-pool/thread-pool.ts#L132)

#### Returns

`void`

***

### submitTask()

> **submitTask**\<`T`\>(`type`, `data`): `Promise`\<`T`\>

Defined in: [packages/shared/classes/src/lib/thread-pool/thread-pool.ts:118](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/thread-pool/thread-pool.ts#L118)

#### Type Parameters

##### T

`T` = `any`

#### Parameters

##### type

`string`

##### data

`any`

#### Returns

`Promise`\<`T`\>
