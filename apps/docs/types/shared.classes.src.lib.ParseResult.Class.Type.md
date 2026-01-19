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

[gdg-fsc-workspace](../wiki/modules) / [shared/classes/src/lib](../wiki/shared.classes.src.lib) / [ParseResult](../wiki/shared.classes.src.lib.Namespace.ParseResult) / Type

# Class: Type

Defined in: node\_modules/effect/dist/dts/ParseResult.d.ts:157

The `Type` variant of the `ParseIssue` type represents an error that occurs when the `actual` value is not of the expected type.
The `ast` field specifies the expected type, and the `actual` field contains the value that caused the error.

## Since

3.10.0

## Constructors

### Constructor

> **new Type**(`ast`, `actual`, `message?`): `Type`

Defined in: node\_modules/effect/dist/dts/ParseResult.d.ts:165

#### Parameters

##### ast

`AST`

##### actual

`unknown`

##### message?

`string`

#### Returns

`Type`

## Properties

### \_tag

> `readonly` **\_tag**: `"Type"` = `"Type"`

Defined in: node\_modules/effect/dist/dts/ParseResult.d.ts:164

#### Since

3.10.0

***

### actual

> `readonly` **actual**: `unknown`

Defined in: node\_modules/effect/dist/dts/ParseResult.d.ts:159

***

### ast

> `readonly` **ast**: `AST`

Defined in: node\_modules/effect/dist/dts/ParseResult.d.ts:158

***

### message?

> `readonly` `optional` **message**: `string`

Defined in: node\_modules/effect/dist/dts/ParseResult.d.ts:160
