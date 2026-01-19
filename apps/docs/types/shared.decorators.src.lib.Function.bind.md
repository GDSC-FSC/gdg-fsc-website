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

[gdg-fsc-workspace](../wiki/modules) / [shared/decorators/src/lib](../wiki/shared.decorators.src.lib) / bind

# Function: bind()

> **bind**\<`T`\>(`_target`, `propertyKey`, `descriptor`): `TypedPropertyDescriptor`\<[`Method`](../wiki/shared.decorators.src.lib.TypeAlias.Method)\<`unknown`\>\>

Defined in: [packages/shared/decorators/src/lib/bind/bind.ts:38](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/decorators/src/lib/bind/bind.ts#L38)

Decorator that automatically binds a method to its class instance.
This ensures `this` always refers to the class instance, even when
the method is passed as a callback or stored separately.

## Type Parameters

### T

`T` = `unknown`

## Parameters

### \_target

`T`

### propertyKey

`string` | `symbol`

### descriptor

`TypedPropertyDescriptor`\<[`Method`](../wiki/shared.decorators.src.lib.TypeAlias.Method)\<`unknown`\>\>

## Returns

`TypedPropertyDescriptor`\<[`Method`](../wiki/shared.decorators.src.lib.TypeAlias.Method)\<`unknown`\>\>

## Example

```ts
class MyClass {
```

## Bind

handleClick() {
    console.log(this); // Always refers to MyClass instance
  }
}
