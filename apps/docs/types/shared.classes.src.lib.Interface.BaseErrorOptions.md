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

[gdg-fsc-workspace](../wiki/modules) / [shared/classes/src/lib](../wiki/shared.classes.src.lib) / BaseErrorOptions

# Interface: BaseErrorOptions

Defined in: [packages/shared/classes/src/lib/error/error.types.ts:33](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/error/error.types.ts#L33)

Configuration options for BaseError instances.

 BaseErrorOptions

## Properties

### cause

> **cause**: `Error`

Defined in: [packages/shared/classes/src/lib/error/error.types.ts:34](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/error/error.types.ts#L34)

The original error that caused this error

***

### command

> **command**: `string`

Defined in: [packages/shared/classes/src/lib/error/error.types.ts:35](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/error/error.types.ts#L35)

The command identifier that was being executed

***

### metadata?

> `optional` **metadata**: `Record`\<`string`, `unknown`\>

Defined in: [packages/shared/classes/src/lib/error/error.types.ts:37](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/error/error.types.ts#L37)

Additional contextual information

***

### parseResult?

> `optional` **parseResult**: [`ParseError`](../wiki/shared.classes.src.lib.ParseResult.Class.ParseError)

Defined in: [packages/shared/classes/src/lib/error/error.types.ts:36](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/error/error.types.ts#L36)

Optional Effect parsing error details

***

### timestamp?

> `optional` **timestamp**: `number`

Defined in: [packages/shared/classes/src/lib/error/error.types.ts:38](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/error/error.types.ts#L38)

When the error occurred (milliseconds since epoch)
