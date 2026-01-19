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

[gdg-fsc-workspace](../wiki/modules) / [shared/classes/src/lib](../wiki/shared.classes.src.lib) / aggregateErrors

# Function: aggregateErrors()

> **aggregateErrors**(`errors`, `options`): [`BaseError`](../wiki/shared.classes.src.lib.Class.BaseError)

Defined in: [packages/shared/classes/src/lib/error/error.ts:606](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/error/error.ts#L606)

Aggregates multiple errors into a single BaseError.

Useful when multiple operations fail and you want to collect all errors
before reporting them together.

## Parameters

### errors

`Error`[]

Array of errors to aggregate

### options

[`AggregateErrorOptions`](../wiki/shared.classes.src.lib.Interface.AggregateErrorOptions)

Configuration options

## Returns

[`BaseError`](../wiki/shared.classes.src.lib.Class.BaseError)

A BaseError containing all aggregated errors

## Examples

```ts
const errors: Error[] = [];

for (const item of items) {
  try {
    await processItem(item);
  } catch (error) {
    errors.push(error as Error);
  }
}

if (errors.length > 0) {
  throw aggregateErrors(errors, {
    command: 'batch:process',
    metadata: { totalItems: items.length }
  });
}
```

```ts
// Custom message
throw aggregateErrors(errors, {
  command: 'validation:all',
  message: 'Multiple validation failures occurred'
});
```
