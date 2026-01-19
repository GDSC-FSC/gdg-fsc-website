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

[gdg-fsc-workspace](../wiki/modules) / [shared/classes/src/lib](../wiki/shared.classes.src.lib) / [ParseResult](../wiki/shared.classes.src.lib.Namespace.ParseResult) / ArrayFormatterIssue

# Interface: ArrayFormatterIssue

Defined in: node\_modules/effect/dist/dts/ParseResult.d.ts:541

Represents an issue returned by the [ArrayFormatter](../wiki/shared.classes.src.lib.ParseResult.Variable.ArrayFormatter) formatter.

## Since

3.10.0

## Properties

### \_tag

> `readonly` **\_tag**: `"Pointer"` \| `"Unexpected"` \| `"Missing"` \| `"Composite"` \| `"Refinement"` \| `"Transformation"` \| `"Type"` \| `"Forbidden"`

Defined in: node\_modules/effect/dist/dts/ParseResult.d.ts:545

The tag identifying the type of parse issue.

***

### message

> `readonly` **message**: `string`

Defined in: node\_modules/effect/dist/dts/ParseResult.d.ts:553

A descriptive message explaining the issue.

***

### path

> `readonly` **path**: readonly `PropertyKey`[]

Defined in: node\_modules/effect/dist/dts/ParseResult.d.ts:549

The path to the property where the issue occurred.
