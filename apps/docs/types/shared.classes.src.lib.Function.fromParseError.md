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

[gdg-fsc-workspace](../wiki/modules) / [shared/classes/src/lib](../wiki/shared.classes.src.lib) / fromParseError

# Function: fromParseError()

> **fromParseError**(`parseError`, `command`, `metadata?`): [`BaseError`](../wiki/shared.classes.src.lib.Class.BaseError)

Defined in: [packages/shared/classes/src/lib/error/error.ts:562](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/error/error.ts#L562)

Creates a BaseError from an Effect ParseResult.ParseError.

This function is specifically designed to handle Effect schema validation
errors and attach the parse result for detailed error information.

## Parameters

### parseError

[`ParseError`](../wiki/shared.classes.src.lib.ParseResult.Class.ParseError)

The Effect parse error

### command

`string`

The command identifier

### metadata?

`Record`\<`string`, `unknown`\>

Optional metadata

## Returns

[`BaseError`](../wiki/shared.classes.src.lib.Class.BaseError)

A BaseError with attached parse result

## Example

```ts
import { Schema } from 'effect';

const UserSchema = Schema.Struct({
  id: Schema.String,
  email: Schema.String,
  age: Schema.Number
});

function validateUser(data: unknown): User {
  const result = Schema.decodeUnknownEither(UserSchema)(data);

  if (Either.isLeft(result)) {
    throw fromParseError(
      result.left,
      'user:validate',
      { input: data }
    );
  }

  return result.right;
}
```
