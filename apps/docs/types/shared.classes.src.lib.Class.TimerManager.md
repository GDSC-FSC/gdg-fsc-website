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

[gdg-fsc-workspace](../wiki/modules) / [shared/classes/src/lib](../wiki/shared.classes.src.lib) / TimerManager

# Class: TimerManager

Defined in: [packages/shared/classes/src/lib/time-manager/time-manager.ts:25](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/time-manager/time-manager.ts#L25)

## Constructors

### Constructor

> **new TimerManager**(): `TimerManager`

#### Returns

`TimerManager`

## Accessors

### activeCount

#### Get Signature

> **get** **activeCount**(): `number`

Defined in: [packages/shared/classes/src/lib/time-manager/time-manager.ts:128](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/time-manager/time-manager.ts#L128)

Returns the number of active timers

##### Returns

`number`

## Methods

### clear()

> **clear**(...`timers`): `void`

Defined in: [packages/shared/classes/src/lib/time-manager/time-manager.ts:89](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/time-manager/time-manager.ts#L89)

Clears specific timers and removes them from tracking

#### Parameters

##### timers

...`TimerHandle`[]

#### Returns

`void`

***

### clearAll()

> **clearAll**(): `void`

Defined in: [packages/shared/classes/src/lib/time-manager/time-manager.ts:110](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/time-manager/time-manager.ts#L110)

Clears all tracked timers

#### Returns

`void`

***

### clearByType()

> **clearByType**(`type`): `void`

Defined in: [packages/shared/classes/src/lib/time-manager/time-manager.ts:118](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/time-manager/time-manager.ts#L118)

Clears only timers of a specific type

#### Parameters

##### type

`"timeout"` | `"interval"` | `"immediate"`

#### Returns

`void`

***

### dispose()

> **dispose**(): `void`

Defined in: [packages/shared/classes/src/lib/time-manager/time-manager.ts:164](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/time-manager/time-manager.ts#L164)

Disposes the timer manager and clears all timers

#### Returns

`void`

***

### getActiveTimers()

> **getActiveTimers**(): `object`[]

Defined in: [packages/shared/classes/src/lib/time-manager/time-manager.ts:135](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/time-manager/time-manager.ts#L135)

Returns information about all active timers

#### Returns

`object`[]

***

### immediate()

> **immediate**(`callback`): `Immediate`

Defined in: [packages/shared/classes/src/lib/time-manager/time-manager.ts:69](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/time-manager/time-manager.ts#L69)

Creates an immediate that will be automatically tracked and cleaned up

#### Parameters

##### callback

() => `void`

#### Returns

`Immediate`

***

### interval()

> **interval**(`ms`, `callback`): `Timeout`

Defined in: [packages/shared/classes/src/lib/time-manager/time-manager.ts:52](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/time-manager/time-manager.ts#L52)

Creates an interval that will be automatically tracked and cleaned up

#### Parameters

##### ms

`number`

##### callback

() => `void`

#### Returns

`Timeout`

***

### timeout()

> **timeout**(`ms`, `callback`): `Timeout`

Defined in: [packages/shared/classes/src/lib/time-manager/time-manager.ts:32](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/time-manager/time-manager.ts#L32)

Creates a timeout that will be automatically tracked and cleaned up

#### Parameters

##### ms

`number`

##### callback

() => `void`

#### Returns

`Timeout`

***

### withTimers()

> **withTimers**\<`T`\>(`fn`): `Promise`\<`T`\>

Defined in: [packages/shared/classes/src/lib/time-manager/time-manager.ts:147](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/time-manager/time-manager.ts#L147)

Executes a function with automatic cleanup of all timers created during execution

#### Type Parameters

##### T

`T`

#### Parameters

##### fn

(`tm`) => `Promise`\<`T`\>

#### Returns

`Promise`\<`T`\>
