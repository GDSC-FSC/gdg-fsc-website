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

[gdg-fsc-workspace](../wiki/modules) / [shared/classes/src/lib](../wiki/shared.classes.src.lib) / createTaggedError

# Function: createTaggedError()

> **createTaggedError**\<`T`\>(`name`): \<`A`\>(`args`) => `YieldableError` & `object` & `Readonly`\<`A`\>

Defined in: [packages/shared/classes/src/lib/error/error.ts:459](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/error/error.ts#L459)

Creates a new tagged error class factory for custom error types.

This utility function simplifies creating domain-specific error types
that integrate with Effect's tagged error system and discriminated unions.

## Type Parameters

### T

`T` *extends* `string`

The tag name literal type

## Parameters

### name

`T`

The tag name for the error type

## Returns

A tagged error constructor

> **new createTaggedError**\<`A`\>(`args`): `YieldableError` & `object` & `Readonly`\<`A`\>

### Parameters

#### args

`Equals`\<`A`, \{ \}\> *extends* `true` ? `void` : \{ readonly \[P in string \| number \| symbol as P extends "\_tag" ? never : P\]: A\[P\] \}

### Returns

`YieldableError` & `object` & `Readonly`\<`A`\>

## Examples

```ts
// Create a custom error type
const ValidationErrorBase = createTaggedError('ValidationError');

export class ValidationError extends ValidationErrorBase<{
  cause: Error;
  command: string;
  field: string;
  value: unknown;
}> {
  constructor(cause: Error, command: string, field: string, value: unknown) {
    super({ cause, command, field, value });
  }
}
```

```ts
// Usage in application
throw new ValidationError(
  new Error('Invalid email format'),
  'user:validate',
  'email',
  'invalid-email'
);
```

```ts
// Creating multiple custom errors
export const NetworkErrorBase = createTaggedError('NetworkError');
export const DatabaseErrorBase = createTaggedError('DatabaseError');
export const AuthErrorBase = createTaggedError('AuthError');
```
