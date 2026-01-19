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

[gdg-fsc-workspace](../wiki/modules) / [shared/utils/src/lib](../wiki/shared.utils.src.lib) / Stringify

# Function: Stringify()

> **Stringify**(`obj`): `string`

Defined in: [packages/shared/utils/src/lib/helpers.ts:43](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/helpers.ts#L43)

Converts an object to a formatted JSON string with proper indentation.

## Parameters

### obj

`object`

The object to convert to a JSON string

## Returns

`string`

A properly formatted JSON string representation of the input object with 2-space indentation

## Example

```ts
const obj = { name: "John", age: 30 };
const jsonString = Stringify(obj);
// Returns:
// {
//   "name": "John",
//   "age": 30
// }
```

## Remarks

- Uses JSON.stringify() internally with null replacer and 2-space indent
- Handles circular references by throwing an error
- Preserves object structure and nesting
- Useful for debugging, logging, and data serialization
- Safe with primitives, arrays, objects, null and undefined
