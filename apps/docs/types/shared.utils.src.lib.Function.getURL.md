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

[gdg-fsc-workspace](../wiki/modules) / [shared/utils/src/lib](../wiki/shared.utils.src.lib) / getURL

# Function: getURL()

> **getURL**(`path?`): `string`

Defined in: [packages/shared/utils/src/lib/helpers.ts:72](https://github.com/GDSC-FSC/gdg-fsc-website/blob/1faf2b31bc3b07227d9a626cb6f6cf113a3ba9b9/packages/shared/utils/src/lib/helpers.ts#L72)

Constructs a fully qualified URL based on the current globalThis's location,
with an optional path.

## Parameters

### path?

`string` = `''`

Optional path to append to the base URL

## Returns

`string`

Complete URL with proper formatting and protocol

## Example

```ts
// Assuming current page is "http://localhost:5173/dashboard"
getURL("api/users") // Returns "http://localhost:5173/api/users"
getURL() // Returns "http://localhost:5173"

// Assuming current page is "[https://example.com/products](https://example.com/products)"
getURL("test") // Returns "[https://example.com/test](https://example.com/test)"
```

## Remarks

- Uses globalThis.location.origin as the base URL.
- Removes trailing slashes from base URL.
- Removes leading slashes from path.
- Handles empty/undefined path gracefully.
- Suitable for client-side contexts where the API/resource is on the same origin.
- NOT recommended for defining a fixed API base URL across environments or for server-side use.
