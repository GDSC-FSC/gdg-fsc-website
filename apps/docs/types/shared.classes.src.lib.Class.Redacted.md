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

[gdg-fsc-workspace](../wiki/modules) / [shared/classes/src/lib](../wiki/shared.classes.src.lib) / Redacted

# Class: Redacted\<T\>

Defined in: [packages/shared/classes/src/lib/redacted/redacted.ts:39](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/redacted/redacted.ts#L39)

A utility class representing a sensitive value that should be redacted when serialized, logged, or inspected.

The `Redacted` class encapsulates a value and prevents its accidental exposure via stringification, serialization,
or inspection. All such operations will yield the `[REDACTED]` marker instead of the real value.
The true value can only be retrieved intentionally via `getValue()` or `valueOf()`.

## Final

## Web

## Version

1.0.0

## Author

Mike Odnis

## Author

WomB0ComB0

## Example

```ts
// Create a redacted value
const secret = Redacted.make('mypassword');
secret.toString(); // '[REDACTED]'
secret.getValue(); // 'mypassword'
```

## Type Parameters

### T

`T` = `string`

## Methods

### equals()

> **equals**(`other`): `boolean`

Defined in: [packages/shared/classes/src/lib/redacted/redacted.ts:165](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/redacted/redacted.ts#L165)

Compares this instance with another Redacted instance for equality of values.

#### Parameters

##### other

`Redacted`\<`T`\>

The other instance to compare.

#### Returns

`boolean`

True if underlying values are equal, else false.

#### Example

```ts
const a = Redacted.make('x');
const b = Redacted.make('x');
a.equals(b); // true
```

***

### getValue()

> **getValue**(): `T`

Defined in: [packages/shared/classes/src/lib/redacted/redacted.ts:105](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/redacted/redacted.ts#L105)

Returns the underlying sensitive value.

#### Returns

`T`

The original value.

#### See

Redacted#valueOf

***

### inspect()

> **inspect**(): `string`

Defined in: [packages/shared/classes/src/lib/redacted/redacted.ts:150](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/redacted/redacted.ts#L150)

Returns a string for manual inspection, always "[REDACTED]".

#### Returns

`string`

The redaction marker "[REDACTED]".

***

### toJSON()

> **toJSON**(): `string`

Defined in: [packages/shared/classes/src/lib/redacted/redacted.ts:128](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/redacted/redacted.ts#L128)

Returns a string for JSON serialization, always as "[REDACTED]".

#### Returns

`string`

The redaction marker "[REDACTED]".

#### Web

#### See

Redacted#toString

***

### toString()

> **toString**(): `string`

Defined in: [packages/shared/classes/src/lib/redacted/redacted.ts:116](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/redacted/redacted.ts#L116)

Returns a string representing the redacted value for logging or display.

#### Returns

`string`

The redaction marker "[REDACTED]".

#### Web

***

### valueOf()

> **valueOf**(): `T`

Defined in: [packages/shared/classes/src/lib/redacted/redacted.ts:192](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/redacted/redacted.ts#L192)

Returns the actual value for valueOf conversions.

#### Returns

`T`

The underlying value.

***

### isRedacted()

> `static` **isRedacted**\<`T`\>(`value`): `value is Redacted<T>`

Defined in: [packages/shared/classes/src/lib/redacted/redacted.ts:181](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/redacted/redacted.ts#L181)

Type guard to check if a value is a Redacted instance.

#### Type Parameters

##### T

`T`

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is Redacted<T>`

True if value is a Redacted.

#### See

https://www.typescriptlang.org/docs/handbook/advanced-types.html#using-type-predicates

***

### make()

> `static` **make**\<`T`\>(`value`): `Redacted`\<`T`\>

Defined in: [packages/shared/classes/src/lib/redacted/redacted.ts:94](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/classes/src/lib/redacted/redacted.ts#L94)

Factory method to create a new Redacted instance.

#### Type Parameters

##### T

`T`

#### Parameters

##### value

`T`

The value to redact.

#### Returns

`Redacted`\<`T`\>

The redacted wrapper for the value.

#### Throws

If the value is null or undefined.

#### See

Redacted#getValue

#### Example

```ts
const r = Redacted.make(1234);
```
