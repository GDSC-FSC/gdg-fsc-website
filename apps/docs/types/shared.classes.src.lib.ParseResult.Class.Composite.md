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

[gdg-fsc-workspace](../wiki/modules) / [shared/classes/src/lib](../wiki/shared.classes.src.lib) / [ParseResult](../wiki/shared.classes.src.lib.Namespace.ParseResult) / Composite

# Class: Composite

Defined in: node\_modules/effect/dist/dts/ParseResult.d.ts:105

Error that contains multiple issues.

## Since

3.10.0

## Constructors

### Constructor

> **new Composite**(`ast`, `actual`, `issues`, `output?`): `Composite`

Defined in: node\_modules/effect/dist/dts/ParseResult.d.ts:114

#### Parameters

##### ast

`AST`

##### actual

`unknown`

##### issues

[`SingleOrNonEmpty`](../wiki/shared.classes.src.lib.ParseResult.TypeAlias.SingleOrNonEmpty)\<[`ParseIssue`](../wiki/shared.classes.src.lib.ParseResult.TypeAlias.ParseIssue)\>

##### output?

`unknown`

#### Returns

`Composite`

## Properties

### \_tag

> `readonly` **\_tag**: `"Composite"` = `"Composite"`

Defined in: node\_modules/effect/dist/dts/ParseResult.d.ts:113

#### Since

3.10.0

***

### actual

> `readonly` **actual**: `unknown`

Defined in: node\_modules/effect/dist/dts/ParseResult.d.ts:107

***

### ast

> `readonly` **ast**: `AST`

Defined in: node\_modules/effect/dist/dts/ParseResult.d.ts:106

***

### issues

> `readonly` **issues**: [`SingleOrNonEmpty`](../wiki/shared.classes.src.lib.ParseResult.TypeAlias.SingleOrNonEmpty)\<[`ParseIssue`](../wiki/shared.classes.src.lib.ParseResult.TypeAlias.ParseIssue)\>

Defined in: node\_modules/effect/dist/dts/ParseResult.d.ts:108

***

### output?

> `readonly` `optional` **output**: `unknown`

Defined in: node\_modules/effect/dist/dts/ParseResult.d.ts:109
