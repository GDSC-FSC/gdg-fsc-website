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

[gdg-fsc-workspace](../wiki/modules) / [shared/classes/src/lib](../wiki/shared.classes.src.lib) / [ParseResult](../wiki/shared.classes.src.lib.Namespace.ParseResult) / Refinement

# Class: Refinement

Defined in: node\_modules/effect/dist/dts/ParseResult.d.ts:122

Error that occurs when a refinement has an error.

## Since

3.10.0

## Constructors

### Constructor

> **new Refinement**(`ast`, `actual`, `kind`, `issue`): `Refinement`

Defined in: node\_modules/effect/dist/dts/ParseResult.d.ts:131

#### Parameters

##### ast

`Refinement`

##### actual

`unknown`

##### kind

`"From"` | `"Predicate"`

##### issue

[`ParseIssue`](../wiki/shared.classes.src.lib.ParseResult.TypeAlias.ParseIssue)

#### Returns

`Refinement`

## Properties

### \_tag

> `readonly` **\_tag**: `"Refinement"` = `"Refinement"`

Defined in: node\_modules/effect/dist/dts/ParseResult.d.ts:130

#### Since

3.10.0

***

### actual

> `readonly` **actual**: `unknown`

Defined in: node\_modules/effect/dist/dts/ParseResult.d.ts:124

***

### ast

> `readonly` **ast**: `Refinement`

Defined in: node\_modules/effect/dist/dts/ParseResult.d.ts:123

***

### issue

> `readonly` **issue**: [`ParseIssue`](../wiki/shared.classes.src.lib.ParseResult.TypeAlias.ParseIssue)

Defined in: node\_modules/effect/dist/dts/ParseResult.d.ts:126

***

### kind

> `readonly` **kind**: `"From"` \| `"Predicate"`

Defined in: node\_modules/effect/dist/dts/ParseResult.d.ts:125
