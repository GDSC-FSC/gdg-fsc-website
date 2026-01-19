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

[gdg-fsc-workspace](../wiki/modules) / [shared/utils/src/lib](../wiki/shared.utils.src.lib) / parseCodePathDetailed

# Function: parseCodePathDetailed()

> `readonly` **parseCodePathDetailed**\<`C`, `T`\>(`context`, `entity`, `options?`): `string`

Defined in: [packages/shared/utils/src/lib/parse-code-path.ts:166](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/parse-code-path.ts#L166)

Parses and constructs a detailed formatted location string, including file path, entity, and context,
with optional line number, ISO timestamp, and custom prefix control. Useful for enhanced debugging or audit logs.

## Type Parameters

### C

`C`

The type of the context parameter.

### T

`T`

The type of entity (function, class, etc.).

## Parameters

### context

`C`

Context description of the operation or location.

### entity

`T`

The entity whose name is included.

### options?

Optional configuration for output.

#### customPrefix?

`string`

Custom prefix instead of default "location".

#### includeLineNumber?

`boolean`

If true, appends the call site line number.

#### includeTimestamp?

`boolean`

If true, appends an ISO 8601 timestamp.

## Returns

`string`

Detailed formatted location string.

## Throws

Does not throw directly but relies on internal getFilePath logic.

## Example

```ts
parseCodePathDetailed('init', MyClass, {includeLineNumber: true, includeTimestamp: true});
// => "location: ...:42 [2024-06-01T08:00:00.000Z] @MyClass: init"
```

## Author

Mike Odnis

## Author

WomB0ComB0

## See

parseCodePath

## Version

1.0.0
