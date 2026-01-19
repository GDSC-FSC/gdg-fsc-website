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

[gdg-fsc-workspace](../wiki/modules) / [shared/utils/src/lib](../wiki/shared.utils.src.lib) / railway

# Function: railway()

## Call Signature

> **railway**\<`TInput`, `T1`, `E`\>(`input`, `fn1`): `Result`\<`T1`, `E`\>

Defined in: [packages/shared/utils/src/lib/helpers.ts:170](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/helpers.ts#L170)

Applies a series of functions to an input value, short-circuiting on the first failure

### Type Parameters

#### TInput

`TInput`

#### T1

`T1`

#### E

`E`

### Parameters

#### input

`TInput`

Initial input value

#### fn1

(`input`) => `Result`\<`T1`, `E`\>

### Returns

`Result`\<`T1`, `E`\>

Final result after applying all functions or first encountered failure

## Call Signature

> **railway**\<`TInput`, `T1`, `T2`, `E`\>(`input`, `fn1`, `fn2`): `Result`\<`T2`, `E`\>

Defined in: [packages/shared/utils/src/lib/helpers.ts:174](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/helpers.ts#L174)

Applies a series of functions to an input value, short-circuiting on the first failure

### Type Parameters

#### TInput

`TInput`

#### T1

`T1`

#### T2

`T2`

#### E

`E`

### Parameters

#### input

`TInput`

Initial input value

#### fn1

(`input`) => `Result`\<`T1`, `E`\>

#### fn2

(`input`) => `Result`\<`T2`, `E`\>

### Returns

`Result`\<`T2`, `E`\>

Final result after applying all functions or first encountered failure

## Call Signature

> **railway**\<`TInput`, `T1`, `T2`, `T3`, `E`\>(`input`, `fn1`, `fn2`, `fn3`): `Result`\<`T3`, `E`\>

Defined in: [packages/shared/utils/src/lib/helpers.ts:179](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/helpers.ts#L179)

Applies a series of functions to an input value, short-circuiting on the first failure

### Type Parameters

#### TInput

`TInput`

#### T1

`T1`

#### T2

`T2`

#### T3

`T3`

#### E

`E`

### Parameters

#### input

`TInput`

Initial input value

#### fn1

(`input`) => `Result`\<`T1`, `E`\>

#### fn2

(`input`) => `Result`\<`T2`, `E`\>

#### fn3

(`input`) => `Result`\<`T3`, `E`\>

### Returns

`Result`\<`T3`, `E`\>

Final result after applying all functions or first encountered failure

## Call Signature

> **railway**\<`TInput`, `T1`, `T2`, `T3`, `T4`, `E`\>(`input`, `fn1`, `fn2`, `fn3`, `fn4`): `Result`\<`T4`, `E`\>

Defined in: [packages/shared/utils/src/lib/helpers.ts:185](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/helpers.ts#L185)

Applies a series of functions to an input value, short-circuiting on the first failure

### Type Parameters

#### TInput

`TInput`

#### T1

`T1`

#### T2

`T2`

#### T3

`T3`

#### T4

`T4`

#### E

`E`

### Parameters

#### input

`TInput`

Initial input value

#### fn1

(`input`) => `Result`\<`T1`, `E`\>

#### fn2

(`input`) => `Result`\<`T2`, `E`\>

#### fn3

(`input`) => `Result`\<`T3`, `E`\>

#### fn4

(`input`) => `Result`\<`T4`, `E`\>

### Returns

`Result`\<`T4`, `E`\>

Final result after applying all functions or first encountered failure

## Call Signature

> **railway**\<`TInput`, `T1`, `T2`, `T3`, `T4`, `T5`, `E`\>(`input`, `fn1`, `fn2`, `fn3`, `fn4`, `fn5`): `Result`\<`T5`, `E`\>

Defined in: [packages/shared/utils/src/lib/helpers.ts:192](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/helpers.ts#L192)

Applies a series of functions to an input value, short-circuiting on the first failure

### Type Parameters

#### TInput

`TInput`

#### T1

`T1`

#### T2

`T2`

#### T3

`T3`

#### T4

`T4`

#### T5

`T5`

#### E

`E`

### Parameters

#### input

`TInput`

Initial input value

#### fn1

(`input`) => `Result`\<`T1`, `E`\>

#### fn2

(`input`) => `Result`\<`T2`, `E`\>

#### fn3

(`input`) => `Result`\<`T3`, `E`\>

#### fn4

(`input`) => `Result`\<`T4`, `E`\>

#### fn5

(`input`) => `Result`\<`T5`, `E`\>

### Returns

`Result`\<`T5`, `E`\>

Final result after applying all functions or first encountered failure
