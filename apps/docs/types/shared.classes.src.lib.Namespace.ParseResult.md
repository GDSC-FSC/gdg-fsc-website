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

[gdg-fsc-workspace](../wiki/modules) / [shared/classes/src/lib](../wiki/shared.classes.src.lib) / ParseResult

# ParseResult

Re-export Effect types for convenience.

## Other

- [ParseError](../wiki/shared.classes.src.lib.ParseResult.Class.ParseError)
- [DeclarationDecodeUnknown](../wiki/shared.classes.src.lib.ParseResult.TypeAlias.DeclarationDecodeUnknown)
- [DecodeUnknown](../wiki/shared.classes.src.lib.ParseResult.TypeAlias.DecodeUnknown)
- [isParseError](../wiki/shared.classes.src.lib.ParseResult.Variable.isParseError)
- [try](../wiki/shared.classes.src.lib.ParseResult.Variable.try)

## constructors

- [fail](../wiki/shared.classes.src.lib.ParseResult.Variable.fail)
- [fromOption](../wiki/shared.classes.src.lib.ParseResult.Variable.fromOption)
- [parseError](../wiki/shared.classes.src.lib.ParseResult.Variable.parseError)
- [succeed](../wiki/shared.classes.src.lib.ParseResult.Variable.succeed)

## decoding

- [decode](../wiki/shared.classes.src.lib.ParseResult.Variable.decode)
- [decodeEither](../wiki/shared.classes.src.lib.ParseResult.Variable.decodeEither)
- [decodeOption](../wiki/shared.classes.src.lib.ParseResult.Variable.decodeOption)
- [decodePromise](../wiki/shared.classes.src.lib.ParseResult.Variable.decodePromise)
- [decodeSync](../wiki/shared.classes.src.lib.ParseResult.Variable.decodeSync)
- [decodeUnknown](../wiki/shared.classes.src.lib.ParseResult.Variable.decodeUnknown)
- [decodeUnknownEither](../wiki/shared.classes.src.lib.ParseResult.Variable.decodeUnknownEither)
- [decodeUnknownOption](../wiki/shared.classes.src.lib.ParseResult.Variable.decodeUnknownOption)
- [decodeUnknownPromise](../wiki/shared.classes.src.lib.ParseResult.Variable.decodeUnknownPromise)
- [decodeUnknownSync](../wiki/shared.classes.src.lib.ParseResult.Variable.decodeUnknownSync)

## encoding

- [encode](../wiki/shared.classes.src.lib.ParseResult.Variable.encode)
- [encodeEither](../wiki/shared.classes.src.lib.ParseResult.Variable.encodeEither)
- [encodeOption](../wiki/shared.classes.src.lib.ParseResult.Variable.encodeOption)
- [encodePromise](../wiki/shared.classes.src.lib.ParseResult.Variable.encodePromise)
- [encodeSync](../wiki/shared.classes.src.lib.ParseResult.Variable.encodeSync)
- [encodeUnknown](../wiki/shared.classes.src.lib.ParseResult.Variable.encodeUnknown)
- [encodeUnknownEither](../wiki/shared.classes.src.lib.ParseResult.Variable.encodeUnknownEither)
- [encodeUnknownOption](../wiki/shared.classes.src.lib.ParseResult.Variable.encodeUnknownOption)
- [encodeUnknownPromise](../wiki/shared.classes.src.lib.ParseResult.Variable.encodeUnknownPromise)
- [encodeUnknownSync](../wiki/shared.classes.src.lib.ParseResult.Variable.encodeUnknownSync)

## formatting

- [ParseResultFormatter](../wiki/shared.classes.src.lib.ParseResult.Interface.ParseResultFormatter)
- [ArrayFormatter](../wiki/shared.classes.src.lib.ParseResult.Variable.ArrayFormatter)
- [TreeFormatter](../wiki/shared.classes.src.lib.ParseResult.Variable.TreeFormatter)

## guards

- [isComposite](../wiki/shared.classes.src.lib.ParseResult.Variable.isComposite)

## model

- [Composite](../wiki/shared.classes.src.lib.ParseResult.Class.Composite)
- [Forbidden](../wiki/shared.classes.src.lib.ParseResult.Class.Forbidden)
- [Missing](../wiki/shared.classes.src.lib.ParseResult.Class.Missing)
- [Pointer](../wiki/shared.classes.src.lib.ParseResult.Class.Pointer)
- [Refinement](../wiki/shared.classes.src.lib.ParseResult.Class.Refinement)
- [Transformation](../wiki/shared.classes.src.lib.ParseResult.Class.Transformation)
- [Type](../wiki/shared.classes.src.lib.ParseResult.Class.Type)
- [Unexpected](../wiki/shared.classes.src.lib.ParseResult.Class.Unexpected)
- [ArrayFormatterIssue](../wiki/shared.classes.src.lib.ParseResult.Interface.ArrayFormatterIssue)
- [ParseIssue](../wiki/shared.classes.src.lib.ParseResult.TypeAlias.ParseIssue)
- [Path](../wiki/shared.classes.src.lib.ParseResult.TypeAlias.Path)
- [SingleOrNonEmpty](../wiki/shared.classes.src.lib.ParseResult.TypeAlias.SingleOrNonEmpty)

## optimisation

- [eitherOrUndefined](../wiki/shared.classes.src.lib.ParseResult.Variable.eitherOrUndefined)
- [flatMap](../wiki/shared.classes.src.lib.ParseResult.Variable.flatMap)
- [map](../wiki/shared.classes.src.lib.ParseResult.Variable.map)
- [mapBoth](../wiki/shared.classes.src.lib.ParseResult.Variable.mapBoth)
- [mapError](../wiki/shared.classes.src.lib.ParseResult.Variable.mapError)
- [orElse](../wiki/shared.classes.src.lib.ParseResult.Variable.orElse)

## type id

- [ParseErrorTypeId](../wiki/shared.classes.src.lib.ParseResult.TypeAlias.ParseErrorTypeId)
- [ParseErrorTypeId](../wiki/shared.classes.src.lib.ParseResult.Variable.ParseErrorTypeId)

## validation

- [asserts](../wiki/shared.classes.src.lib.ParseResult.Variable.asserts)
- [is](../wiki/shared.classes.src.lib.ParseResult.Variable.is)
- [validate](../wiki/shared.classes.src.lib.ParseResult.Variable.validate)
- [validateEither](../wiki/shared.classes.src.lib.ParseResult.Variable.validateEither)
- [validateOption](../wiki/shared.classes.src.lib.ParseResult.Variable.validateOption)
- [validatePromise](../wiki/shared.classes.src.lib.ParseResult.Variable.validatePromise)
- [validateSync](../wiki/shared.classes.src.lib.ParseResult.Variable.validateSync)
