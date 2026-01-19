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

[gdg-fsc-workspace](../wiki/modules) / [shared/utils/src/lib](../wiki/shared.utils.src.lib) / Logger

# Class: Logger

Defined in: [packages/shared/utils/src/lib/logger.ts:113](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/logger.ts#L113)

A versatile logging utility that works in both browser and Node.js environments.
Supports multiple log levels, colorized output, and structured data logging.

## Constructors

### Constructor

> **new Logger**(`context`, `options?`): `Logger`

Defined in: [packages/shared/utils/src/lib/logger.ts:128](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/logger.ts#L128)

Create a new Logger instance or return an existing one for the given context

#### Parameters

##### context

`string`

The context name for this logger (e.g., component or service name)

##### options?

[`LoggerOptions`](../wiki/shared.utils.src.lib.Interface.LoggerOptions) = `{}`

Optional logger configuration

#### Returns

`Logger`

## Methods

### action()

> **action**(`message`, `data?`): `void`

Defined in: [packages/shared/utils/src/lib/logger.ts:292](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/logger.ts#L292)

Log an action message (for server actions or important user interactions)

#### Parameters

##### message

`string`

The action message

##### data?

[`LogData`](../wiki/shared.utils.src.lib.Interface.LogData)

Optional data to include

#### Returns

`void`

***

### debug()

> **debug**(`message`, `data?`): `void`

Defined in: [packages/shared/utils/src/lib/logger.ts:269](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/logger.ts#L269)

Log a debug message

#### Parameters

##### message

`string`

The debug message

##### data?

[`LogData`](../wiki/shared.utils.src.lib.Interface.LogData)

Optional data to include

#### Returns

`void`

***

### error()

> **error**(`message`, `error?`, `data?`): `void`

Defined in: [packages/shared/utils/src/lib/logger.ts:241](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/logger.ts#L241)

Log an error message

#### Parameters

##### message

`string`

The error message

##### error?

`unknown`

Optional Error object or unknown error

##### data?

[`LogData`](../wiki/shared.utils.src.lib.Interface.LogData)

Optional additional data

#### Returns

`void`

***

### group()

> **group**(`label`): `void`

Defined in: [packages/shared/utils/src/lib/logger.ts:315](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/logger.ts#L315)

Group related log messages (Console.group wrapper)

#### Parameters

##### label

`string`

The group label

#### Returns

`void`

***

### groupEnd()

> **groupEnd**(): `void`

Defined in: [packages/shared/utils/src/lib/logger.ts:328](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/logger.ts#L328)

End a log group (Console.groupEnd wrapper)

#### Returns

`void`

***

### info()

> **info**(`message`, `data?`): `void`

Defined in: [packages/shared/utils/src/lib/logger.ts:229](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/logger.ts#L229)

Log an informational message

#### Parameters

##### message

`string`

The message to log

##### data?

[`LogData`](../wiki/shared.utils.src.lib.Interface.LogData)

Optional data to include

#### Returns

`void`

***

### success()

> **success**(`message`, `data?`): `void`

Defined in: [packages/shared/utils/src/lib/logger.ts:304](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/logger.ts#L304)

Log a success message

#### Parameters

##### message

`string`

The success message

##### data?

[`LogData`](../wiki/shared.utils.src.lib.Interface.LogData)

Optional data to include

#### Returns

`void`

***

### time()

> **time**\<`T`\>(`label`, `fn`): `Promise`\<`T`\>

Defined in: [packages/shared/utils/src/lib/logger.ts:341](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/logger.ts#L341)

Log execution time of a function

#### Type Parameters

##### T

`T`

The return type of the function being timed

#### Parameters

##### label

`string`

Description of the operation being timed

##### fn

() => `T` \| `Promise`\<`T`\>

Function to execute and time

#### Returns

`Promise`\<`T`\>

The result of the function execution

***

### trace()

> **trace**(`message`, `data?`): `void`

Defined in: [packages/shared/utils/src/lib/logger.ts:280](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/logger.ts#L280)

Log a trace message (most verbose level)

#### Parameters

##### message

`string`

The trace message

##### data?

[`LogData`](../wiki/shared.utils.src.lib.Interface.LogData)

Optional data to include

#### Returns

`void`

***

### warn()

> **warn**(`message`, `data?`): `void`

Defined in: [packages/shared/utils/src/lib/logger.ts:258](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/logger.ts#L258)

Log a warning message

#### Parameters

##### message

`string`

The warning message

##### data?

[`LogData`](../wiki/shared.utils.src.lib.Interface.LogData)

Optional data to include

#### Returns

`void`

***

### getLogger()

> `static` **getLogger**(`context`, `options?`): `Logger`

Defined in: [packages/shared/utils/src/lib/logger.ts:143](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/logger.ts#L143)

Get a logger instance for the given context.
If a logger with this context already exists, returns the existing instance.

#### Parameters

##### context

`string`

The context name

##### options?

[`LoggerOptions`](../wiki/shared.utils.src.lib.Interface.LoggerOptions)

Optional logger configuration

#### Returns

`Logger`

A logger instance for the specified context

***

### setGlobalLogLevel()

> `static` **setGlobalLogLevel**(`level`): `void`

Defined in: [packages/shared/utils/src/lib/logger.ts:159](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/logger.ts#L159)

Set global minimum log level for all logger instances

#### Parameters

##### level

[`LogLevel`](../wiki/shared.utils.src.lib.Enumeration.LogLevel)

The minimum level to log across all loggers

#### Returns

`void`
