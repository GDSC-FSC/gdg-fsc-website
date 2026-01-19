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

[gdg-fsc-workspace](../wiki/modules) / [shared/utils/src/lib](../wiki/shared.utils.src.lib) / parseCodePath

# Function: parseCodePath()

> `readonly` **parseCodePath**\<`C`, `T`\>(`context`, `entity`): `string`

Defined in: [packages/shared/utils/src/lib/parse-code-path.ts:53](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/parse-code-path.ts#L53)

Parses and constructs a formatted string representing the code location, including the file path,
associated entity name (such as a function, class, component, or decorator), and human context.

The result is useful for debugging, developer logging, and traceability—matching the entity (function, class, etc.)
and the context in source code references.

## Type Parameters

### C

`C`

The type of the context value.

### T

`T`

The type of the entity parameter.

## Parameters

### context

`C`

A description, situation, or custom value relevant to this code path.

### entity

`T`

The entity whose name is included; may be a function, class, object, component, decorator, or their name.

## Returns

`string`

A formatted string: "location: <path> @<entity>: <context>".

## Throws

This function does not throw directly, but see getFilePath, which may throw in rare stack-trace parsing errors.

## Example

```ts
// Function usage
function myFunction() {}
parseCodePath('initialization', myFunction);
// => "location: /current/dir/file.js @myFunction: initialization"

// Class usage
class MyClass {}
parseCodePath('instantiating MyClass', MyClass);
// => "location: ... @MyClass: instantiating MyClass"

// String as entity
parseCodePath('some context', 'EntityAsString');
// => "location: ... @EntityAsString: some context"
```

## Author

Mike Odnis

## Author

WomB0ComB0

## See

parseCodePathDetailed

## Version

1.0.0
