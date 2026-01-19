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

[gdg-fsc-workspace](../wiki/modules) / [shared/utils/src/lib](../wiki/shared.utils.src.lib) / LoggerOptions

# Interface: LoggerOptions

Defined in: [packages/shared/utils/src/lib/logger.ts:82](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/logger.ts#L82)

Configuration options for the Logger

## Properties

### colorize?

> `optional` **colorize**: `boolean`

Defined in: [packages/shared/utils/src/lib/logger.ts:96](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/logger.ts#L96)

Whether to colorize log output

***

### filePath?

> `optional` **filePath**: `string`

Defined in: [packages/shared/utils/src/lib/logger.ts:106](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/logger.ts#L106)

Path to the log file if logToFile is enabled

***

### includeTimestamp?

> `optional` **includeTimestamp**: `boolean`

Defined in: [packages/shared/utils/src/lib/logger.ts:91](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/logger.ts#L91)

Whether to include timestamps in log messages

***

### logToFile?

> `optional` **logToFile**: `boolean`

Defined in: [packages/shared/utils/src/lib/logger.ts:101](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/logger.ts#L101)

Whether to write logs to a file (server-side only)

***

### minLevel?

> `optional` **minLevel**: [`LogLevel`](../wiki/shared.utils.src.lib.Enumeration.LogLevel)

Defined in: [packages/shared/utils/src/lib/logger.ts:86](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/logger.ts#L86)

The minimum level of messages to log
