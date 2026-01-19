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

[gdg-fsc-workspace](../wiki/modules) / [shared/classes/src/lib](../wiki/shared.classes.src.lib) / [ParseResult](../wiki/shared.classes.src.lib.Namespace.ParseResult) / mapBoth

# Variable: mapBoth()

> `const` **mapBoth**: \{\<`E`, `E2`, `A`, `A2`\>(`options`): \<`R`\>(`self`) => `Effect`\<`A2`, `E2`, `R`\>; \<`A`, `E`, `R`, `E2`, `A2`\>(`self`, `options`): `Effect`\<`A2`, `E2`, `R`\>; \}

Defined in: node\_modules/effect/dist/dts/ParseResult.d.ts:328

## Call Signature

> \<`E`, `E2`, `A`, `A2`\>(`options`): \<`R`\>(`self`) => `Effect`\<`A2`, `E2`, `R`\>

### Type Parameters

#### E

`E`

#### E2

`E2`

#### A

`A`

#### A2

`A2`

### Parameters

#### options

##### onFailure

(`e`) => `E2`

##### onSuccess

(`a`) => `A2`

### Returns

> \<`R`\>(`self`): `Effect`\<`A2`, `E2`, `R`\>

#### Type Parameters

##### R

`R`

#### Parameters

##### self

`Effect`\<`A`, `E`, `R`\>

#### Returns

`Effect`\<`A2`, `E2`, `R`\>

### Since

3.10.0

## Call Signature

> \<`A`, `E`, `R`, `E2`, `A2`\>(`self`, `options`): `Effect`\<`A2`, `E2`, `R`\>

### Type Parameters

#### A

`A`

#### E

`E`

#### R

`R`

#### E2

`E2`

#### A2

`A2`

### Parameters

#### self

`Effect`\<`A`, `E`, `R`\>

#### options

##### onFailure

(`e`) => `E2`

##### onSuccess

(`a`) => `A2`

### Returns

`Effect`\<`A2`, `E2`, `R`\>

### Since

3.10.0

## Since

3.10.0
