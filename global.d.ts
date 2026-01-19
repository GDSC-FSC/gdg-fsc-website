/**
 * Copyright (c) 2026 GDG on Campus Farmingdale State College
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// @ts-check

/**
 * @fileoverview Table of Contents for the project's utility functions and types.
 *
 * This file provides an organized overview of the functions and types defined across
 * different modules, making it easier to navigate the codebase.
 */

/**
 * ## I. `effect/src/Function.ts`
 *
 * This section covers utilities related to functions, including guards and
 * the `dual` function for data-first/data-last style.
 *
 * ### Guards
 * - {@link isFunction}: Tests if a value is a `function`.
 *
 * ### Functions
 * - {@link dual}: Creates a function that can be used in a data-last (pipeable) or data-first style.
 */

/**
 * ## II. `effect/src/HKT.ts`
 *
 * This section defines higher-kinded types (HKT) interfaces.
 *
 * ### Interfaces
 * - {@link TypeLambda}: A generic interface for type constructors.
 */

/**
 * ## III. `effect/src/Types.ts`
 *
 * This section contains common utility types, especially for tuple manipulation.
 *
 * ### Tuples
 * - {@link _TupleOf}: Internal helper type for creating fixed-length tuples.
 * - {@link TupleOf}: Represents a tuple with a fixed number of elements of type `T`.
 * - {@link TupleOfAtLeast}: Represents a tuple with at least `N` elements of type `T`.
 */

/**
 * ## IV. `effect/src/Predicate.ts`
 *
 * This section provides a comprehensive set of predicate functions and types
 * for type guarding and logical operations.
 *
 * ### Models
 * - {@link Predicate}: A function that takes a value and returns a boolean.
 * - {@link Refinement}: A predicate that narrows down a type.
 *
 * ### Type Lambdas
 * - {@link PredicateTypeLambda}: Type lambda for `Predicate`.
 *
 * ### Type-Level
 * - {@link Predicate.In}: Extracts the input type of a `Predicate`.
 * - {@link Predicate.Any}: Represents any `Predicate` type.
 * - {@link Refinement.In}: Extracts the input type of a `Refinement`.
 * - {@link Refinement.Out}: Extracts the refined output type of a `Refinement`.
 * - {@link Refinement.Any}: Represents any `Refinement` type.
 *
 * ### Guards
 * - {@link isFunction}: Tests if a value is a `function`. (Duplicated for module completeness)
 * - {@link isTupleOf}: Determines if an `Array` is a tuple with exactly `N` elements.
 * - {@link isTupleOfAtLeast}: Determines if an `Array` is a tuple with at least `N` elements.
 * - {@link isTruthy}: Tests if a value is `truthy`.
 * - {@link isSet}: Tests if a value is a `Set`.
 * - {@link isMap}: Tests if a value is a `Map`.
 * - {@link isString}: Tests if a value is a `string`.
 * - {@link isNumber}: Tests if a value is a `number`.
 * - {@link isBoolean}: Tests if a value is a `boolean`.
 * - {@link isBigInt}: Tests if a value is a `bigint`.
 * - {@link isSymbol}: Tests if a value is a `symbol`.
 * - {@link isPropertyKey}: Internal guard for property keys.
 * - {@link isUndefined}: Tests if a value is `undefined`.
 * - {@link isNotUndefined}: Tests if a value is not `undefined`.
 * - {@link isNull}: Tests if a value is `null`.
 * - {@link isNotNull}: Tests if a value is not `null`.
 * - {@link isNever}: A guard that always fails.
 * - {@link isUnknown}: A guard that always succeeds.
 * - {@link isRecordOrArray}: Internal guard for records or arrays.
 * - {@link isObject}: Tests if a value is an `object`.
 * - {@link hasProperty}: Checks if an `object` contains a specified property key.
 * - {@link isTagged}: Tests if an `object` has a `_tag` property matching a given tag.
 * - {@link isNullable}: A guard that succeeds when the input is `null` or `undefined`.
 * - {@link isNotNullable}: A guard that succeeds when the input is not `null` or `undefined`.
 * - {@link isError}: A guard that succeeds when the input is an `Error`.
 * - {@link isUint8Array}: A guard that succeeds when the input is a `Uint8Array`.
 * - {@link isDate}: A guard that succeeds when the input is a `Date`.
 * - {@link isIterable}: A guard that succeeds when the input is an `Iterable`.
 * - {@link isRecord}: A guard that succeeds when the input is a record.
 * - {@link isReadonlyRecord}: A guard that succeeds when the input is a readonly record.
 * - {@link isPromise}: A guard that succeeds when the input is a Promise.
 * - {@link isPromiseLike}: A guard that succeeds when the input is a PromiseLike.
 * - {@link isRegExp}: Tests if a value is a `RegExp`.
 *
 * ### Combinators
 * - {@link mapInput}: Given a `Predicate<A>` returns a `Predicate<B>`.
 * - {@link compose}: Composes two refinements/predicates.
 * - {@link product}: Combines two predicates on a tuple.
 * - {@link all}: Combines an iterable of predicates.
 * - {@link productMany}: Combines a predicate with an iterable of predicates.
 * - {@link tuple}: Combines multiple predicates into a predicate for a tuple.
 * - {@link struct}: Combines multiple predicates into a predicate for an object.
 * - {@link not}: Negates the result of a given predicate.
 * - {@link or}: Combines two predicates with logical OR.
 * - {@link and}: Combines two predicates with logical AND.
 * - {@link xor}: Combines two predicates with logical XOR.
 * - {@link eqv}: Tests for logical equivalence between two predicates.
 * - {@link implies}: Represents the logical implication combinator for predicates.
 * - {@link nor}: Combines two predicates with logical NOR.
 * - {@link nand}: Combines two predicates with logical NAND.
 *
 * ### Elements
 * - {@link every}: Checks if every predicate in a collection returns true for a value.
 * - {@link some}: Checks if at least one predicate in a collection returns true for a value.
 */

/**
 * ## V. Custom Utility Types and Functions
 *
 * This section includes various custom type utilities and a specific function.
 *
 * ### Type Utilities
 * - {@link Prettify}: Prettifies a type by removing `readonly` and optional modifiers.
 * - {@link PrettifyFunction}: Prettifies a function type.
 * - {@link Head}: Gets the first element of an array type.
 * - {@link Tail}: Gets the tail (all but the first element) of an array type.
 * - {@link Merge}: Merges two objects, omitting common properties from the second.
 * - {@link MergeAll}: Merges an array of objects into a single object type.
 * - {@link NonEmptyArray}: Creates a non-empty array type.
 * - {@link Split}: Splits a string into an array of strings using a delimiter.
 * - {@link Join}: Joins an array of strings into a single string.
 * - {@link ParseInt}: Parses a string literal to a number literal.
 * - {@link FilterArrayToObject}: Filters an array to an object based on a type.
 * - {@link ArrayOfLength}: Creates an array type of a given length.
 * - {@link Fill}: Fills an array type to a given length with a specified type.
 * - {@link GetIndex}: Gets the element at a specific index in an array type.
 * - {@link Flatten}: Flattens an array of arrays into a single array type.
 * - {@link Zip}: Zips two array types together into an array of pairs.
 * - {@link Paths}: Gets all dot-notated paths of an object type.
 * - {@link OmitByType}: Omits properties from an object type based on their value type.
 * - {@link DeepPartial}: Makes all properties in an object and its nested objects partial.
 * - {@link DeepRequired}: Makes all properties in an object and its nested objects required.
 * - {@link DeepReadonly}: Makes all properties in an object and its nested objects readonly.
 * - {@link UnionToIntersection}: Converts a union type to an intersection type.
 * - {@link RemoveIndexSignature}: Removes index signatures from a type.
 * - {@link DeepNonNullable}: Makes all properties in an object and its nested objects non-nullable.
 * - {@link ValueOf}: Gets the type of all values in an object.
 * - {@link RequireAtLeastOne}: Makes at least one property required in a type.
 * - {@link RequireOnlyOne}: Makes exactly one property required and the rest optional.
 * - {@link Awaited}: Gets the type inside a Promise.
 * - {@link DeepMutable}: Makes all properties in an object and its nested objects mutable.
 * - {@link Without}: Creates a type without certain properties from another type.
 * - {@link XOR}: Creates an exclusive OR (XOR) type between two types.
 * - {@link DeepPick}: Like Pick but works with nested properties using dot notation.
 * - {@link IsEqual}: Checks if two types are exactly equal.
 * - {@link UnionToTuple}: Converts a union type to a tuple type.
 * - {@link Decrement}: Decrements a numeric type by one (up to 19).
 * - {@link ExtractNthProperty}: Extracts the Nth property from a tuple type.
 * - {@link ExtractPropertyByName}: Extracts a property by name from an object type.
 * - {@link FirstArgument}: Gets the type of the first argument of a function.
 * - {@link AllArguments}: Gets the types of all arguments of a function as a tuple.
 *
 * ### Functions
 * - {@link isNotNull}: Type guard that checks if a value is not null.
 * - {@link sleep}: Pauses execution for a specified duration.
 * - {@link error}: Creates an error with a message and optional cause.
 */

//#region ./node_modules/effect/src/Function.ts
/**
 * Tests if a value is a `function`.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { isFunction } from "effect/Predicate"
 *
 * assert.deepStrictEqual(isFunction(isFunction), true)
 * assert.deepStrictEqual(isFunction("function"), false)
 * ```
 *
 * @category guards
 * @since 2.0.0
 */
const isFunction = (input: unknown): input is Function => typeof input === 'function';
/**
 * Creates a function that can be used in a data-last (aka `pipe`able) or
 * data-first style.
 *
 * The first parameter to `dual` is either the arity of the uncurried function
 * or a predicate that determines if the function is being used in a data-first
 * or data-last style.
 *
 * Using the arity is the most common use case, but there are some cases where
 * you may want to use a predicate. For example, if you have a function that
 * takes an optional argument, you can use a predicate to determine if the
 * function is being used in a data-first or data-last style.
 *
 * You can pass either the arity of the uncurried function or a predicate
 * which determines if the function is being used in a data-first or
 * data-last style.
 *
 * **Example** (Using arity to determine data-first or data-last style)
 *
 * ```ts
 * import { dual, pipe } from "effect/Function"
 *
 * const sum = dual<
 *   (that: number) => (self: number) => number,
 *   (self: number, that: number) => number
 * >(2, (self, that) => self + that)
 *
 * console.log(sum(2, 3)) // 5
 * console.log(pipe(2, sum(3))) // 5
 * ```
 *
 * **Example** (Using call signatures to define the overloads)
 *
 * ```ts
 * import { dual, pipe } from "effect/Function"
 *
 * const sum: {
 *   (that: number): (self: number) => number
 *   (self: number, that: number): number
 * } = dual(2, (self: number, that: number): number => self + that)
 *
 * console.log(sum(2, 3)) // 5
 * console.log(pipe(2, sum(3))) // 5
 * ```
 *
 * **Example** (Using a predicate to determine data-first or data-last style)
 *
 * ```ts
 * import { dual, pipe } from "effect/Function"
 *
 * const sum = dual<
 *   (that: number) => (self: number) => number,
 *   (self: number, that: number) => number
 * >(
 *   (args) => args.length === 2,
 *   (self, that) => self + that
 * )
 *
 * console.log(sum(2, 3)) // 5
 * console.log(pipe(2, sum(3))) // 5
 * ```
 *
 * @since 2.0.0
 */
const dual: {
  /**
   * Creates a function that can be used in a data-last (aka `pipe`able) or
   * data-first style.
   *
   * The first parameter to `dual` is either the arity of the uncurried function
   * or a predicate that determines if the function is being used in a data-first
   * or data-last style.
   *
   * Using the arity is the most common use case, but there are some cases where
   * you may want to use a predicate. For example, if you have a function that
   * takes an optional argument, you can use a predicate to determine if the
   * function is being used in a data-first or data-last style.
   *
   * You can pass either the arity of the uncurried function or a predicate
   * which determines if the function is being used in a data-first or
   * data-last style.
   *
   * **Example** (Using arity to determine data-first or data-last style)
   *
   * ```ts
   * import { dual, pipe } from "effect/Function"
   *
   * const sum = dual<
   *   (that: number) => (self: number) => number,
   *   (self: number, that: number) => number
   * >(2, (self, that) => self + that)
   *
   * console.log(sum(2, 3)) // 5
   * console.log(pipe(2, sum(3))) // 5
   * ```
   *
   * **Example** (Using call signatures to define the overloads)
   *
   * ```ts
   * import { dual, pipe } from "effect/Function"
   *
   * const sum: {
   *   (that: number): (self: number) => number
   *   (self: number, that: number): number
   * } = dual(2, (self: number, that: number): number => self + that)
   *
   * console.log(sum(2, 3)) // 5
   * console.log(pipe(2, sum(3))) // 5
   * ```
   *
   * **Example** (Using a predicate to determine data-first or data-last style)
   *
   * ```ts
   * import { dual, pipe } from "effect/Function"
   *
   * const sum = dual<
   *   (that: number) => (self: number) => number,
   *   (self: number, that: number) => number
   * >(
   *   (args) => args.length === 2,
   *   (self, that) => self + that
   * )
   *
   * console.log(sum(2, 3)) // 5
   * console.log(pipe(2, sum(3))) // 5
   * ```
   *
   * @since 2.0.0
   */
  <DataLast extends (...args: Array<any>) => any, DataFirst extends (...args: Array<any>) => any>(
    arity: Parameters<DataFirst>['length'],
    body: DataFirst,
  ): DataLast & DataFirst;
  /**
   * Creates a function that can be used in a data-last (aka `pipe`able) or
   * data-first style.
   *
   * The first parameter to `dual` is either the arity of the uncurried function
   * or a predicate that determines if the function is being used in a data-first
   * or data-last style.
   *
   * Using the arity is the most common use case, but there are some cases where
   * you may want to use a predicate. For example, if you have a function that
   * takes an optional argument, you can use a predicate to determine if the
   * function is being used in a data-first or data-last style.
   *
   * You can pass either the arity of the uncurried function or a predicate
   * which determines if the function is being used in a data-first or
   * data-last style.
   *
   * **Example** (Using arity to determine data-first or data-last style)
   *
   * ```ts
   * import { dual, pipe } from "effect/Function"
   *
   * const sum = dual<
   *   (that: number) => (self: number) => number,
   *   (self: number, that: number) => number
   * >(2, (self, that) => self + that)
   *
   * console.log(sum(2, 3)) // 5
   * console.log(pipe(2, sum(3))) // 5
   * ```
   *
   * **Example** (Using call signatures to define the overloads)
   *
   * ```ts
   * import { dual, pipe } from "effect/Function"
   *
   * const sum: {
   *   (that: number): (self: number) => number
   *   (self: number, that: number): number
   * } = dual(2, (self: number, that: number): number => self + that)
   *
   * console.log(sum(2, 3)) // 5
   * console.log(pipe(2, sum(3))) // 5
   * ```
   *
   * **Example** (Using a predicate to determine data-first or data-last style)
   *
   * ```ts
   * import { dual, pipe } from "effect/Function"
   *
   * const sum = dual<
   *   (that: number) => (self: number) => number,
   *   (self: number, that: number) => number
   * >(
   *   (args) => args.length === 2,
   *   (self, that) => self + that
   * )
   *
   * console.log(sum(2, 3)) // 5
   * console.log(pipe(2, sum(3))) // 5
   * ```
   *
   * @since 2.0.0
   */
  <DataLast extends (...args: Array<any>) => any, DataFirst extends (...args: Array<any>) => any>(
    isDataFirst: (args: IArguments) => boolean,
    body: DataFirst,
  ): DataLast & DataFirst;
} = (arity, body) => {
  if (typeof arity === 'function') {
    return function () {
      if (arity(arguments)) {
        // @ts-expect-error
        return body.apply(this, arguments);
      }
      return ((self: any) => body(self, ...arguments)) as any;
    };
  }

  switch (arity) {
    case 0:
    case 1:
      throw new RangeError(`Invalid arity ${arity}`);

    case 2:
      return (a, b) => {
        if (arguments.length >= 2) {
          return body(a, b);
        }
        return (self: any) => body(self, a);
      };

    case 3:
      return (a, b, c) => {
        if (arguments.length >= 3) {
          return body(a, b, c);
        }
        return (self: any) => body(self, a, b);
      };

    case 4:
      return (a, b, c, d) => {
        if (arguments.length >= 4) {
          return body(a, b, c, d);
        }
        return (self: any) => body(self, a, b, c);
      };

    case 5:
      return (a, b, c, d, e) => {
        if (arguments.length >= 5) {
          return body(a, b, c, d, e);
        }
        return (self: any) => body(self, a, b, c, d);
      };

    default:
      return function () {
        if (arguments.length >= arity) {
          // @ts-expect-error
          return body.apply(this, arguments);
        }
        const args = arguments;
        return (self: any) => body(self, ...args);
      };
  }
};
//#region
//#region ./node_modules/effect/src/HKT.ts
/**
 * @since 2.0.0
 */
interface TypeLambda {
  readonly In: unknown;
  readonly Out2: unknown;
  readonly Out1: unknown;
  readonly Target: unknown;
}
//#endregion
//#region ./node_modules/effect/src/Types.ts
/**
 * A collection of types that are commonly used types.
 *
 * @since 2.0.0
 */

type _TupleOf<T, N extends number, R extends Array<unknown>> = R['length'] extends N
  ? R
  : _TupleOf<T, N, [T, ...R]>;

/**
 * Represents a tuple with a fixed number of elements of type `T`.
 *
 * This type constructs a tuple that has exactly `N` elements of type `T`.
 *
 * @typeParam N - The number of elements in the tuple.
 * @typeParam T - The type of elements in the tuple.
 *
 * @example
 * ```ts
 * import { TupleOf } from "effect/Types"
 *
 * // A tuple with exactly 3 numbers
 * const example1: TupleOf<3, number> = [1, 2, 3]; // valid
 * // @ts-expect-error
 * const example2: TupleOf<3, number> = [1, 2]; // invalid
 * // @ts-expect-error
 * const example3: TupleOf<3, number> = [1, 2, 3, 4]; // invalid
 * ```
 *
 * @category tuples
 * @since 3.3.0
 */
type TupleOf<N extends number, T> = N extends N
  ? number extends N
    ? Array<T>
    : _TupleOf<T, N, []>
  : never;

/**
 * Represents a tuple with at least `N` elements of type `T`.
 *
 * This type constructs a tuple that has a fixed number of elements `N` of type `T` at the start,
 * followed by any number (including zero) of additional elements of the same type `T`.
 *
 * @typeParam N - The minimum number of elements in the tuple.
 * @typeParam T - The type of elements in the tuple.
 *
 * @example
 * ```ts
 * import { TupleOfAtLeast } from "effect/Types"
 *
 * // A tuple with at least 3 numbers
 * const example1: TupleOfAtLeast<3, number> = [1, 2, 3]; // valid
 * const example2: TupleOfAtLeast<3, number> = [1, 2, 3, 4, 5]; // valid
 * // @ts-expect-error
 * const example3: TupleOfAtLeast<3, number> = [1, 2]; // invalid
 * ```
 *
 * @category tuples
 * @since 3.3.0
 */
type TupleOfAtLeast<N extends number, T> = [...TupleOf<N, T>, ...Array<T>];
//#endregion
//#region ./node_modules/effect/src/Predicate.ts
/**
 * @since 2.0.0
 */

/**
 * @category models
 * @since 2.0.0
 */
type Predicate<in A> = (a: A) => boolean;

/**
 * @category type lambdas
 * @since 2.0.0
 */
interface PredicateTypeLambda extends TypeLambda {
  readonly type: Predicate<this['Target']>;
}

/**
 * @category models
 * @since 2.0.0
 */
type Refinement<in A, out B extends A> = (a: A) => a is B;

/**
 * @since 3.6.0
 * @category type-level
 */
declare namespace Predicate {
  /**
   * @since 3.6.0
   * @category type-level
   */
  type In<T extends Any> = [T] extends [Predicate<infer _A>] ? _A : never;
  /**
   * @since 3.6.0
   * @category type-level
   */
  type Any = Predicate<never>;
}

/**
 * @since 3.6.0
 * @category type-level
 */
declare namespace Refinement {
  /**
   * @since 3.6.0
   * @category type-level
   */
  type In<T extends Any> = [T] extends [Refinement<infer _A, infer _>] ? _A : never;
  /**
   * @since 3.6.0
   * @category type-level
   */
  type Out<T extends Any> = [T] extends [Refinement<infer _, infer _B>] ? _B : never;
  /**
   * @since 3.6.0
   * @category type-level
   */
  type Any = Refinement<any, any>;
}

/**
 * Given a `Predicate<A>` returns a `Predicate<B>`
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { Predicate, Number } from "effect"
 *
 * const minLength3 = Predicate.mapInput(Number.greaterThan(2), (s: string) => s.length)
 *
 * assert.deepStrictEqual(minLength3("a"), false)
 * assert.deepStrictEqual(minLength3("aa"), false)
 * assert.deepStrictEqual(minLength3("aaa"), true)
 * assert.deepStrictEqual(minLength3("aaaa"), true)
 * ```
 *
 * @category combinators
 * @since 2.0.0
 */
const mapInput: {
  /**
   * Given a `Predicate<A>` returns a `Predicate<B>`
   *
   * @example
   * ```ts
   * import * as assert from "node:assert"
   * import { Predicate, Number } from "effect"
   *
   * const minLength3 = Predicate.mapInput(Number.greaterThan(2), (s: string) => s.length)
   *
   * assert.deepStrictEqual(minLength3("a"), false)
   * assert.deepStrictEqual(minLength3("aa"), false)
   * assert.deepStrictEqual(minLength3("aaa"), true)
   * assert.deepStrictEqual(minLength3("aaaa"), true)
   * ```
   *
   * @category combinators
   * @since 2.0.0
   */
  <B, A>(f: (b: B) => A): (self: Predicate<A>) => Predicate<B>;
  /**
   * Given a `Predicate<A>` returns a `Predicate<B>`
   *
   * @example
   * ```ts
   * import * as assert from "node:assert"
   * import { Predicate, Number } from "effect"
   *
   * const minLength3 = Predicate.mapInput(Number.greaterThan(2), (s: string) => s.length)
   *
   * assert.deepStrictEqual(minLength3("a"), false)
   * assert.deepStrictEqual(minLength3("aa"), false)
   * assert.deepStrictEqual(minLength3("aaa"), true)
   * assert.deepStrictEqual(minLength3("aaaa"), true)
   * ```
   *
   * @category combinators
   * @since 2.0.0
   */
  <A, B>(self: Predicate<A>, f: (b: B) => A): Predicate<B>;
} = dual(
  2,
  <A, B>(self: Predicate<A>, f: (b: B) => A): Predicate<B> =>
    (b) =>
      self(f(b)),
);

/**
 * Determine if an `Array` is a tuple with exactly `N` elements, narrowing down the type to `TupleOf`.
 *
 * An `Array` is considered to be a `TupleOf` if its length is exactly `N`.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { isTupleOf } from "effect/Predicate"
 *
 * assert.deepStrictEqual(isTupleOf([1, 2, 3], 3), true);
 * assert.deepStrictEqual(isTupleOf([1, 2, 3], 2), false);
 * assert.deepStrictEqual(isTupleOf([1, 2, 3], 4), false);
 *
 * const arr: number[] = [1, 2, 3];
 * if (isTupleOf(arr, 3)) {
 *   console.log(arr);
 *   // ^? [number, number, number]
 * }
 * ```
 *
 * @category guards
 * @since 3.3.0
 */
const isTupleOf: {
  /**
   * Determine if an `Array` is a tuple with exactly `N` elements, narrowing down the type to `TupleOf`.
   *
   * An `Array` is considered to be a `TupleOf` if its length is exactly `N`.
   *
   * @example
   * ```ts
   * import * as assert from "node:assert"
   * import { isTupleOf } from "effect/Predicate"
   *
   * assert.deepStrictEqual(isTupleOf([1, 2, 3], 3), true);
   * assert.deepStrictEqual(isTupleOf([1, 2, 3], 2), false);
   * assert.deepStrictEqual(isTupleOf([1, 2, 3], 4), false);
   *
   * const arr: number[] = [1, 2, 3];
   * if (isTupleOf(arr, 3)) {
   *   console.log(arr);
   *   // ^? [number, number, number]
   * }
   * ```
   *
   * @category guards
   * @since 3.3.0
   */
  <N extends number>(n: N): <T>(self: ReadonlyArray<T>) => self is TupleOf<N, T>;
  /**
   * Determine if an `Array` is a tuple with exactly `N` elements, narrowing down the type to `TupleOf`.
   *
   * An `Array` is considered to be a `TupleOf` if its length is exactly `N`.
   *
   * @example
   * ```ts
   * import * as assert from "node:assert"
   * import { isTupleOf } from "effect/Predicate"
   *
   * assert.deepStrictEqual(isTupleOf([1, 2, 3], 3), true);
   * assert.deepStrictEqual(isTupleOf([1, 2, 3], 2), false);
   * assert.deepStrictEqual(isTupleOf([1, 2, 3], 4), false);
   *
   * const arr: number[] = [1, 2, 3];
   * if (isTupleOf(arr, 3)) {
   *   console.log(arr);
   *   // ^? [number, number, number]
   * }
   * ```
   *
   * @category guards
   * @since 3.3.0
   */
  <T, N extends number>(self: ReadonlyArray<T>, n: N): self is TupleOf<N, T>;
} = dual(
  2,
  <T, N extends number>(self: ReadonlyArray<T>, n: N): self is TupleOf<N, T> => self.length === n,
);

/**
 * Determine if an `Array` is a tuple with at least `N` elements, narrowing down the type to `TupleOfAtLeast`.
 *
 * An `Array` is considered to be a `TupleOfAtLeast` if its length is at least `N`.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { isTupleOfAtLeast } from "effect/Predicate"
 *
 * assert.deepStrictEqual(isTupleOfAtLeast([1, 2, 3], 3), true);
 * assert.deepStrictEqual(isTupleOfAtLeast([1, 2, 3], 2), true);
 * assert.deepStrictEqual(isTupleOfAtLeast([1, 2, 3], 4), false);
 *
 * const arr: number[] = [1, 2, 3, 4];
 * if (isTupleOfAtLeast(arr, 3)) {
 *   console.log(arr);
 *   // ^? [number, number, number, ...number[]]
 * }
 * ```
 *
 * @category guards
 * @since 3.3.0
 */
const isTupleOfAtLeast: {
  /**
   * Determine if an `Array` is a tuple with at least `N` elements, narrowing down the type to `TupleOfAtLeast`.
   *
   * An `Array` is considered to be a `TupleOfAtLeast` if its length is at least `N`.
   *
   * @example
   * ```ts
   * import * as assert from "node:assert"
   * import { isTupleOfAtLeast } from "effect/Predicate"
   *
   * assert.deepStrictEqual(isTupleOfAtLeast([1, 2, 3], 3), true);
   * assert.deepStrictEqual(isTupleOfAtLeast([1, 2, 3], 2), true);
   * assert.deepStrictEqual(isTupleOfAtLeast([1, 2, 3], 4), false);
   *
   * const arr: number[] = [1, 2, 3, 4];
   * if (isTupleOfAtLeast(arr, 3)) {
   *   console.log(arr);
   *   // ^? [number, number, number, ...number[]]
   * }
   * ```
   *
   * @category guards
   * @since 3.3.0
   */
  <N extends number>(n: N): <T>(self: ReadonlyArray<T>) => self is TupleOfAtLeast<N, T>;
  /**
   * Determine if an `Array` is a tuple with at least `N` elements, narrowing down the type to `TupleOfAtLeast`.
   *
   * An `Array` is considered to be a `TupleOfAtLeast` if its length is at least `N`.
   *
   * @example
   * ```ts
   * import * as assert from "node:assert"
   * import { isTupleOfAtLeast } from "effect/Predicate"
   *
   * assert.deepStrictEqual(isTupleOfAtLeast([1, 2, 3], 3), true);
   * assert.deepStrictEqual(isTupleOfAtLeast([1, 2, 3], 2), true);
   * assert.deepStrictEqual(isTupleOfAtLeast([1, 2, 3], 4), false);
   *
   * const arr: number[] = [1, 2, 3, 4];
   * if (isTupleOfAtLeast(arr, 3)) {
   *   console.log(arr);
   *   // ^? [number, number, number, ...number[]]
   * }
   * ```
   *
   * @category guards
   * @since 3.3.0
   */
  <T, N extends number>(self: ReadonlyArray<T>, n: N): self is TupleOfAtLeast<N, T>;
} = dual(
  2,
  <T, N extends number>(self: ReadonlyArray<T>, n: N): self is TupleOfAtLeast<N, T> =>
    self.length >= n,
);

/**
 * Tests if a value is `truthy`.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { isTruthy } from "effect/Predicate"
 *
 * assert.deepStrictEqual(isTruthy(1), true)
 * assert.deepStrictEqual(isTruthy(0), false)
 * assert.deepStrictEqual(isTruthy(""), false)
 * ```
 *
 * @category guards
 * @since 2.0.0
 */
const isTruthy = (input: unknown) => !!input;

/**
 * Tests if a value is a `Set`.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { isSet } from "effect/Predicate"
 *
 * assert.deepStrictEqual(isSet(new Set([1, 2])), true)
 * assert.deepStrictEqual(isSet(new Set()), true)
 * assert.deepStrictEqual(isSet({}), false)
 * assert.deepStrictEqual(isSet(null), false)
 * assert.deepStrictEqual(isSet(undefined), false)
 * ```
 *
 * @category guards
 * @since 2.0.0
 */
const isSet = (input: unknown): input is Set<unknown> => input instanceof Set;

/**
 * Tests if a value is a `Map`.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { isMap } from "effect/Predicate"
 *
 * assert.deepStrictEqual(isMap(new Map()), true)
 * assert.deepStrictEqual(isMap({}), false)
 * assert.deepStrictEqual(isMap(null), false)
 * assert.deepStrictEqual(isMap(undefined), false)
 * ```
 *
 * @category guards
 * @since 2.0.0
 */
const isMap = (input: unknown): input is Map<unknown, unknown> => input instanceof Map;

/**
 * Tests if a value is a `string`.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { isString } from "effect/Predicate"
 *
 * assert.deepStrictEqual(isString("a"), true)
 *
 * assert.deepStrictEqual(isString(1), false)
 * ```
 *
 * @category guards
 * @since 2.0.0
 */
const isString = (input: unknown): input is string => typeof input === 'string';

/**
 * Tests if a value is a `number`.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { isNumber } from "effect/Predicate"
 *
 * assert.deepStrictEqual(isNumber(2), true)
 *
 * assert.deepStrictEqual(isNumber("2"), false)
 * ```
 *
 * @category guards
 * @since 2.0.0
 */
const isNumber = (input: unknown): input is number => typeof input === 'number';

/**
 * Tests if a value is a `boolean`.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { isBoolean } from "effect/Predicate"
 *
 * assert.deepStrictEqual(isBoolean(true), true)
 *
 * assert.deepStrictEqual(isBoolean("true"), false)
 * ```
 *
 * @category guards
 * @since 2.0.0
 */
const isBoolean = (input: unknown): input is boolean => typeof input === 'boolean';

/**
 * Tests if a value is a `bigint`.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { isBigInt } from "effect/Predicate"
 *
 * assert.deepStrictEqual(isBigInt(1n), true)
 *
 * assert.deepStrictEqual(isBigInt(1), false)
 * ```
 *
 * @category guards
 * @since 2.0.0
 */
const isBigInt = (input: unknown): input is bigint => typeof input === 'bigint';

/**
 * Tests if a value is a `symbol`.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { isSymbol } from "effect/Predicate"
 *
 * assert.deepStrictEqual(isSymbol(Symbol.for("a")), true)
 *
 * assert.deepStrictEqual(isSymbol("a"), false)
 * ```
 *
 * @category guards
 * @since 2.0.0
 */
const isSymbol = (input: unknown): input is symbol => typeof input === 'symbol';

// TODO: make public
/** @internal */
const isPropertyKey = (u: unknown): u is PropertyKey => isString(u) || isNumber(u) || isSymbol(u);

/**
 * Tests if a value is `undefined`.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { isUndefined } from "effect/Predicate"
 *
 * assert.deepStrictEqual(isUndefined(undefined), true)
 *
 * assert.deepStrictEqual(isUndefined(null), false)
 * assert.deepStrictEqual(isUndefined("undefined"), false)
 * ```
 *
 * @category guards
 * @since 2.0.0
 */
const isUndefined = (input: unknown): input is undefined => input === undefined;

/**
 * Tests if a value is not `undefined`.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { isNotUndefined } from "effect/Predicate"
 *
 * assert.deepStrictEqual(isNotUndefined(null), true)
 * assert.deepStrictEqual(isNotUndefined("undefined"), true)
 *
 * assert.deepStrictEqual(isNotUndefined(undefined), false)
 * ```
 *
 * @category guards
 * @since 2.0.0
 */
const isNotUndefined = <A>(input: A): input is Exclude<A, undefined> => input !== undefined;

/**
 * Tests if a value is `null`.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { isNull } from "effect/Predicate"
 *
 * assert.deepStrictEqual(isNull(null), true)
 *
 * assert.deepStrictEqual(isNull(undefined), false)
 * assert.deepStrictEqual(isNull("null"), false)
 * ```
 *
 * @category guards
 * @since 2.0.0
 */
const isNull = (input: unknown): input is null => input === null;

/**
 * A guard that always fails.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { isNever } from "effect/Predicate"
 *
 * assert.deepStrictEqual(isNever(null), false)
 * assert.deepStrictEqual(isNever(undefined), false)
 * assert.deepStrictEqual(isNever({}), false)
 * assert.deepStrictEqual(isNever([]), false)
 * ```
 *
 * @category guards
 * @since 2.0.0
 */
const isNever: (input: unknown) => input is never = (_: unknown): _ is never => false;

/**
 * A guard that always succeeds.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { isUnknown } from "effect/Predicate"
 *
 * assert.deepStrictEqual(isUnknown(null), true)
 * assert.deepStrictEqual(isUnknown(undefined), true)
 *
 * assert.deepStrictEqual(isUnknown({}), true)
 * assert.deepStrictEqual(isUnknown([]), true)
 * ```
 *
 * @category guards
 * @since 2.0.0
 */
const isUnknown: (input: unknown) => input is unknown = (_): _ is unknown => true;

/** @internal */
const isRecordOrArray = (input: unknown): input is { [x: PropertyKey]: unknown } =>
  typeof input === 'object' && input !== null;

/**
 * Tests if a value is an `object`.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { isObject } from "effect/Predicate"
 *
 * assert.deepStrictEqual(isObject({}), true)
 * assert.deepStrictEqual(isObject([]), true)
 *
 * assert.deepStrictEqual(isObject(null), false)
 * assert.deepStrictEqual(isObject(undefined), false)
 * ```
 *
 * @category guards
 * @since 2.0.0
 */
const isObject = (input: unknown): input is object => isRecordOrArray(input) || isFunction(input);

/**
 * Checks whether a value is an `object` containing a specified property key.
 *
 * @category guards
 * @since 2.0.0
 */
const hasProperty: {
  /**
   * Checks whether a value is an `object` containing a specified property key.
   *
   * @category guards
   * @since 2.0.0
   */
  <P extends PropertyKey>(property: P): (self: unknown) => self is { [K in P]: unknown };
  /**
   * Checks whether a value is an `object` containing a specified property key.
   *
   * @category guards
   * @since 2.0.0
   */
  <P extends PropertyKey>(self: unknown, property: P): self is { [K in P]: unknown };
} = dual(
  2,
  <P extends PropertyKey>(self: unknown, property: P): self is { [K in P]: unknown } =>
    isObject(self) && property in self,
);

/**
 * Tests if a value is an `object` with a property `_tag` that matches the given tag.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { isTagged } from "effect/Predicate"
 *
 * assert.deepStrictEqual(isTagged(1, "a"), false)
 * assert.deepStrictEqual(isTagged(null, "a"), false)
 * assert.deepStrictEqual(isTagged({}, "a"), false)
 * assert.deepStrictEqual(isTagged({ a: "a" }, "a"), false)
 * assert.deepStrictEqual(isTagged({ _tag: "a" }, "a"), true)
 * assert.deepStrictEqual(isTagged("a")({ _tag: "a" }), true)
 * ```
 *
 * @category guards
 * @since 2.0.0
 */
const isTagged: {
  /**
   * Tests if a value is an `object` with a property `_tag` that matches the given tag.
   *
   * @example
   * ```ts
   * import * as assert from "node:assert"
   * import { isTagged } from "effect/Predicate"
   *
   * assert.deepStrictEqual(isTagged(1, "a"), false)
   * assert.deepStrictEqual(isTagged(null, "a"), false)
   * assert.deepStrictEqual(isTagged({}, "a"), false)
   * assert.deepStrictEqual(isTagged({ a: "a" }, "a"), false)
   * assert.deepStrictEqual(isTagged({ _tag: "a" }, "a"), true)
   * assert.deepStrictEqual(isTagged("a")({ _tag: "a" }), true)
   * ```
   *
   * @category guards
   * @since 2.0.0
   */
  <K extends string>(tag: K): (self: unknown) => self is { _tag: K };
  /**
   * Tests if a value is an `object` with a property `_tag` that matches the given tag.
   *
   * @example
   * ```ts
   * import * as assert from "node:assert"
   * import { isTagged } from "effect/Predicate"
   *
   * assert.deepStrictEqual(isTagged(1, "a"), false)
   * assert.deepStrictEqual(isTagged(null, "a"), false)
   * assert.deepStrictEqual(isTagged({}, "a"), false)
   * assert.deepStrictEqual(isTagged({ a: "a" }, "a"), false)
   * assert.deepStrictEqual(isTagged({ _tag: "a" }, "a"), true)
   * assert.deepStrictEqual(isTagged("a")({ _tag: "a" }), true)
   * ```
   *
   * @category guards
   * @since 2.0.0
   */
  <K extends string>(self: unknown, tag: K): self is { _tag: K };
} = dual(
  2,
  <K extends string>(self: unknown, tag: K): self is { _tag: K } =>
    hasProperty(self, '_tag') && self['_tag'] === tag,
);

/**
 * A guard that succeeds when the input is `null` or `undefined`.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { isNullable } from "effect/Predicate"
 *
 * assert.deepStrictEqual(isNullable(null), true)
 * assert.deepStrictEqual(isNullable(undefined), true)
 *
 * assert.deepStrictEqual(isNullable({}), false)
 * assert.deepStrictEqual(isNullable([]), false)
 * ```
 *
 * @category guards
 * @since 2.0.0
 */
const isNullable = <A>(input: A): input is Extract<A, null | undefined> =>
  input === null || input === undefined;

/**
 * A guard that succeeds when the input is not `null` or `undefined`.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { isNotNullable } from "effect/Predicate"
 *
 * assert.deepStrictEqual(isNotNullable({}), true)
 * assert.deepStrictEqual(isNotNullable([]), true)
 *
 * assert.deepStrictEqual(isNotNullable(null), false)
 * assert.deepStrictEqual(isNotNullable(undefined), false)
 * ```
 *
 * @category guards
 * @since 2.0.0
 */
const isNotNullable = <A>(input: A): input is NonNullable<A> =>
  input !== null && input !== undefined;

/**
 * A guard that succeeds when the input is an `Error`.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { isError } from "effect/Predicate"
 *
 * assert.deepStrictEqual(isError(new Error()), true)
 *
 * assert.deepStrictEqual(isError(null), false)
 * assert.deepStrictEqual(isError({}), false)
 * ```
 *
 * @category guards
 * @since 2.0.0
 */
const isError = (input: unknown): input is Error => input instanceof Error;

/**
 * A guard that succeeds when the input is a `Uint8Array`.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { isUint8Array } from "effect/Predicate"
 *
 * assert.deepStrictEqual(isUint8Array(new Uint8Array()), true)
 *
 * assert.deepStrictEqual(isUint8Array(null), false)
 * assert.deepStrictEqual(isUint8Array({}), false)
 * ```
 *
 * @category guards
 * @since 2.0.0
 */
const isUint8Array = (input: unknown): input is Uint8Array => input instanceof Uint8Array;

/**
 * A guard that succeeds when the input is a `Date`.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { isDate } from "effect/Predicate"
 *
 * assert.deepStrictEqual(isDate(new Date()), true)
 *
 * assert.deepStrictEqual(isDate(null), false)
 * assert.deepStrictEqual(isDate({}), false)
 * ```
 *
 * @category guards
 * @since 2.0.0
 */
const isDate = (input: unknown): input is Date => input instanceof Date;

/**
 * A guard that succeeds when the input is an `Iterable`.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { isIterable } from "effect/Predicate"
 *
 * assert.deepStrictEqual(isIterable([]), true)
 * assert.deepStrictEqual(isIterable(new Set()), true)
 *
 * assert.deepStrictEqual(isIterable(null), false)
 * assert.deepStrictEqual(isIterable({}), false)
 * ```
 *
 * @category guards
 * @since 2.0.0
 */
const isIterable = (input: unknown): input is Iterable<unknown> =>
  hasProperty(input, Symbol.iterator);

/**
 * A guard that succeeds when the input is a record.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { isRecord } from "effect/Predicate"
 *
 * assert.deepStrictEqual(isRecord({}), true)
 * assert.deepStrictEqual(isRecord({ a: 1 }), true)
 *
 * assert.deepStrictEqual(isRecord([]), false)
 * assert.deepStrictEqual(isRecord([1, 2, 3]), false)
 * assert.deepStrictEqual(isRecord(null), false)
 * assert.deepStrictEqual(isRecord(undefined), false)
 * assert.deepStrictEqual(isRecord(() => null), false)
 * ```
 *
 * @category guards
 * @since 2.0.0
 */
const isRecord = (input: unknown): input is { [x: string | symbol]: unknown } =>
  isRecordOrArray(input) && !Array.isArray(input);

/**
 * A guard that succeeds when the input is a readonly record.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { isReadonlyRecord } from "effect/Predicate"
 *
 * assert.deepStrictEqual(isReadonlyRecord({}), true)
 * assert.deepStrictEqual(isReadonlyRecord({ a: 1 }), true)
 *
 * assert.deepStrictEqual(isReadonlyRecord([]), false)
 * assert.deepStrictEqual(isReadonlyRecord([1, 2, 3]), false)
 * assert.deepStrictEqual(isReadonlyRecord(null), false)
 * assert.deepStrictEqual(isReadonlyRecord(undefined), false)
 * ```
 *
 * @category guards
 * @since 2.0.0
 */
const isReadonlyRecord: (input: unknown) => input is { readonly [x: string | symbol]: unknown } =
  isRecord;

/**
 * A guard that succeeds when the input is a Promise.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { isPromise } from "effect/Predicate"
 *
 * assert.deepStrictEqual(isPromise({}), false)
 * assert.deepStrictEqual(isPromise(Promise.resolve("hello")), true)
 * ```
 *
 * @category guards
 * @since 2.0.0
 */
const isPromise = (input: unknown): input is Promise<unknown> =>
  hasProperty(input, 'then') &&
  'catch' in input &&
  isFunction(input.then) &&
  isFunction(input.catch);

/**
 * @category guards
 * @since 2.0.0
 */
const isPromiseLike = (input: unknown): input is PromiseLike<unknown> =>
  hasProperty(input, 'then') && isFunction(input.then);

/**
 * Tests if a value is a `RegExp`.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { Predicate } from "effect"
 *
 * assert.deepStrictEqual(Predicate.isRegExp(/a/), true)
 * assert.deepStrictEqual(Predicate.isRegExp("a"), false)
 * ```
 *
 * @category guards
 * @since 3.9.0
 */
const isRegExp = (input: unknown): input is RegExp => input instanceof RegExp;

/**
 * @since 2.0.0
 */
const compose: {
  /**
   * @since 2.0.0
   */
  <A, B extends A, C extends B, D extends C>(
    bc: Refinement<C, D>,
  ): (ab: Refinement<A, B>) => Refinement<A, D>;
  /**
   * @since 2.0.0
   */
  <A, B extends A>(bc: Predicate<NoInfer<B>>): (ab: Refinement<A, B>) => Refinement<A, B>;
  /**
   * @since 2.0.0
   */
  <A, B extends A, C extends B, D extends C>(
    ab: Refinement<A, B>,
    bc: Refinement<C, D>,
  ): Refinement<A, D>;
  /**
   * @since 2.0.0
   */
  <A, B extends A>(ab: Refinement<A, B>, bc: Predicate<NoInfer<B>>): Refinement<A, B>;
} = dual(
  2,
  <A, B extends A, C extends B, D extends C>(
    ab: Refinement<A, B>,
    bc: Refinement<C, D>,
  ): Refinement<A, D> =>
    (a): a is D =>
      ab(a) && bc(a as C),
);

/**
 * @category combining
 * @since 2.0.0
 */
const product =
  <A, B>(
    self: Predicate<A>,
    that: Predicate<B>,
  ): Predicate<readonly [A, B]> /* readonly because contravariant */ =>
  ([a, b]) =>
    self(a) && that(b);

/**
 * @category combining
 * @since 2.0.0
 */
const all = <A>(collection: Iterable<Predicate<A>>): Predicate<ReadonlyArray<A>> => {
  return (as) => {
    let collectionIndex = 0;
    for (const p of collection) {
      if (collectionIndex >= as.length) {
        break;
      }
      if (p(as[collectionIndex]) === false) {
        return false;
      }
      collectionIndex++;
    }
    return true;
  };
};

/**
 * @category combining
 * @since 2.0.0
 */
const productMany = <A>(
  self: Predicate<A>,
  collection: Iterable<Predicate<A>>,
): Predicate<readonly [A, ...Array<A>]> /* readonly because contravariant */ => {
  const rest = all(collection);
  return ([head, ...tail]) => (self(head) === false ? false : rest(tail));
};

/**
 * Similar to `Promise.all` but operates on `Predicate`s.
 *
 * ```ts skip-type-checking
 * [Refinement<A, B>, Refinement<C, D>, ...] -> Refinement<[A, C, ...], [B, D, ...]>
 * [Predicate<A>, Predicate<B>, ...] -> Predicate<[A, B, ...]>
 * [Refinement<A, B>, Predicate<C>, ...] -> Refinement<[A, C, ...], [B, C, ...]>
 * ```
 *
 * @since 2.0.0
 */
const tuple: {
  /**
   * Similar to `Promise.all` but operates on `Predicate`s.
   *
   * ```ts skip-type-checking
   * [Refinement<A, B>, Refinement<C, D>, ...] -> Refinement<[A, C, ...], [B, D, ...]>
   * [Predicate<A>, Predicate<B>, ...] -> Predicate<[A, B, ...]>
   * [Refinement<A, B>, Predicate<C>, ...] -> Refinement<[A, C, ...], [B, C, ...]>
   * ```
   *
   * @since 2.0.0
   */
  <T extends ReadonlyArray<Predicate.Any>>(
    ...elements: T
  ): [Extract<T[number], Refinement.Any>] extends [never]
    ? Predicate<{ readonly [I in keyof T]: Predicate.In<T[I]> }>
    : Refinement<
        {
          readonly [I in keyof T]: T[I] extends Refinement.Any
            ? Refinement.In<T[I]>
            : Predicate.In<T[I]>;
        },
        {
          readonly [I in keyof T]: T[I] extends Refinement.Any
            ? Refinement.Out<T[I]>
            : Predicate.In<T[I]>;
        }
      >;
} = (...elements: ReadonlyArray<Predicate.Any>) => all(elements) as any;

/**
 * ```ts skip-type-checking
 * { ab: Refinement<A, B>; cd: Refinement<C, D>, ... } -> Refinement<{ ab: A; cd: C; ... }, { ab: B; cd: D; ... }>
 * { a: Predicate<A, B>; b: Predicate<B>, ... } -> Predicate<{ a: A; b: B; ... }>
 * { ab: Refinement<A, B>; c: Predicate<C>, ... } -> Refinement<{ ab: A; c: C; ... }, { ab: B; c: С; ... }>
 * ```
 *
 * @since 2.0.0
 */
const struct: {
  /**
   * ```ts skip-type-checking
   * { ab: Refinement<A, B>; cd: Refinement<C, D>, ... } -> Refinement<{ ab: A; cd: C; ... }, { ab: B; cd: D; ... }>
   * { a: Predicate<A, B>; b: Predicate<B>, ... } -> Predicate<{ a: A; b: B; ... }>
   * { ab: Refinement<A, B>; c: Predicate<C>, ... } -> Refinement<{ ab: A; c: C; ... }, { ab: B; c: С; ... }>
   * ```
   *
   * @since 2.0.0
   */
  <R extends Record<string, Predicate.Any>>(
    fields: R,
  ): [Extract<R[keyof R], Refinement.Any>] extends [never]
    ? Predicate<{ readonly [K in keyof R]: Predicate.In<R[K]> }>
    : Refinement<
        {
          readonly [K in keyof R]: R[K] extends Refinement.Any
            ? Refinement.In<R[K]>
            : Predicate.In<R[K]>;
        },
        {
          readonly [K in keyof R]: R[K] extends Refinement.Any
            ? Refinement.Out<R[K]>
            : Predicate.In<R[K]>;
        }
      >;
} = (<R extends Record<string, Predicate.Any>>(fields: R) => {
  const keys = Object.keys(fields);
  return (a: Record<string, unknown>) => {
    for (const key of keys) {
      if (!fields[key](a[key] as never)) {
        return false;
      }
    }
    return true;
  };
}) as any;

/**
 * Negates the result of a given predicate.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { Predicate, Number } from "effect"
 *
 * const isPositive = Predicate.not(Number.lessThan(0))
 *
 * assert.deepStrictEqual(isPositive(-1), false)
 * assert.deepStrictEqual(isPositive(0), true)
 * assert.deepStrictEqual(isPositive(1), true)
 * ```
 *
 * @category combinators
 * @since 2.0.0
 */
const not =
  <A>(self: Predicate<A>): Predicate<A> =>
  (a) =>
    !self(a);

/**
 * Combines two predicates into a new predicate that returns `true` if at least one of the predicates returns `true`.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { Predicate, Number } from "effect"
 *
 * const nonZero = Predicate.or(Number.lessThan(0), Number.greaterThan(0))
 *
 * assert.deepStrictEqual(nonZero(-1), true)
 * assert.deepStrictEqual(nonZero(0), false)
 * assert.deepStrictEqual(nonZero(1), true)
 * ```
 *
 * @category combinators
 * @since 2.0.0
 */
const or: {
  /**
   * Combines two predicates into a new predicate that returns `true` if at least one of the predicates returns `true`.
   *
   * @example
   * ```ts
   * import * as assert from "node:assert"
   * import { Predicate, Number } from "effect"
   *
   * const nonZero = Predicate.or(Number.lessThan(0), Number.greaterThan(0))
   *
   * assert.deepStrictEqual(nonZero(-1), true)
   * assert.deepStrictEqual(nonZero(0), false)
   * assert.deepStrictEqual(nonZero(1), true)
   * ```
   *
   * @category combinators
   * @since 2.0.0
   */
  <A, C extends A>(
    that: Refinement<A, C>,
  ): <B extends A>(self: Refinement<A, B>) => Refinement<A, B | C>;
  /**
   * Combines two predicates into a new predicate that returns `true` if at least one of the predicates returns `true`.
   *
   * @example
   * ```ts
   * import * as assert from "node:assert"
   * import { Predicate, Number } from "effect"
   *
   * const nonZero = Predicate.or(Number.lessThan(0), Number.greaterThan(0))
   *
   * assert.deepStrictEqual(nonZero(-1), true)
   * assert.deepStrictEqual(nonZero(0), false)
   * assert.deepStrictEqual(nonZero(1), true)
   * ```
   *
   * @category combinators
   * @since 2.0.0
   */
  <A, B extends A, C extends A>(
    self: Refinement<A, B>,
    that: Refinement<A, C>,
  ): Refinement<A, B | C>;
  /**
   * Combines two predicates into a new predicate that returns `true` if at least one of the predicates returns `true`.
   *
   * @example
   * ```ts
   * import * as assert from "node:assert"
   * import { Predicate, Number } from "effect"
   *
   * const nonZero = Predicate.or(Number.lessThan(0), Number.greaterThan(0))
   *
   * assert.deepStrictEqual(nonZero(-1), true)
   * assert.deepStrictEqual(nonZero(0), false)
   * assert.deepStrictEqual(nonZero(1), true)
   * ```
   *
   * @category combinators
   * @since 2.0.0
   */
  <A>(that: Predicate<A>): (self: Predicate<A>) => Predicate<A>;
  /**
   * Combines two predicates into a new predicate that returns `true` if at least one of the predicates returns `true`.
   *
   * @example
   * ```ts
   * import * as assert from "node:assert"
   * import { Predicate, Number } from "effect"
   *
   * const nonZero = Predicate.or(Number.lessThan(0), Number.greaterThan(0))
   *
   * assert.deepStrictEqual(nonZero(-1), true)
   * assert.deepStrictEqual(nonZero(0), false)
   * assert.deepStrictEqual(nonZero(1), true)
   * ```
   *
   * @category combinators
   * @since 2.0.0
   */
  <A>(self: Predicate<A>, that: Predicate<A>): Predicate<A>;
} = dual(
  2,
  <A>(self: Predicate<A>, that: Predicate<A>): Predicate<A> =>
    (a) =>
      self(a) || that(a),
);

/**
 * Combines two predicates into a new predicate that returns `true` if both of the predicates returns `true`.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { Predicate } from "effect"
 *
 * const minLength = (n: number) => (s: string) => s.length >= n
 * const maxLength = (n: number) => (s: string) => s.length <= n
 *
 * const length = (n: number) => Predicate.and(minLength(n), maxLength(n))
 *
 * assert.deepStrictEqual(length(2)("aa"), true)
 * assert.deepStrictEqual(length(2)("a"), false)
 * assert.deepStrictEqual(length(2)("aaa"), false)
 * ```
 *
 * @category combinators
 * @since 2.0.0
 */
const and: {
  /**
   * Combines two predicates into a new predicate that returns `true` if both of the predicates returns `true`.
   *
   * @example
   * ```ts
   * import * as assert from "node:assert"
   * import { Predicate } from "effect"
   *
   * const minLength = (n: number) => (s: string) => s.length >= n
   * const maxLength = (n: number) => (s: string) => s.length <= n
   *
   * const length = (n: number) => Predicate.and(minLength(n), maxLength(n))
   *
   * assert.deepStrictEqual(length(2)("aa"), true)
   * assert.deepStrictEqual(length(2)("a"), false)
   * assert.deepStrictEqual(length(2)("aaa"), false)
   * ```
   *
   * @category combinators
   * @since 2.0.0
   */
  <A, C extends A>(
    that: Refinement<A, C>,
  ): <B extends A>(self: Refinement<A, B>) => Refinement<A, B & C>;
  /**
   * Combines two predicates into a new predicate that returns `true` if both of the predicates returns `true`.
   *
   * @example
   * ```ts
   * import * as assert from "node:assert"
   * import { Predicate } from "effect"
   *
   * const minLength = (n: number) => (s: string) => s.length >= n
   * const maxLength = (n: number) => (s: string) => s.length <= n
   *
   * const length = (n: number) => Predicate.and(minLength(n), maxLength(n))
   *
   * assert.deepStrictEqual(length(2)("aa"), true)
   * assert.deepStrictEqual(length(2)("a"), false)
   * assert.deepStrictEqual(length(2)("aaa"), false)
   * ```
   *
   * @category combinators
   * @since 2.0.0
   */
  <A, B extends A, C extends A>(
    self: Refinement<A, B>,
    that: Refinement<A, C>,
  ): Refinement<A, B & C>;
  /**
   * Combines two predicates into a new predicate that returns `true` if both of the predicates returns `true`.
   *
   * @example
   * ```ts
   * import * as assert from "node:assert"
   * import { Predicate } from "effect"
   *
   * const minLength = (n: number) => (s: string) => s.length >= n
   * const maxLength = (n: number) => (s: string) => s.length <= n
   *
   * const length = (n: number) => Predicate.and(minLength(n), maxLength(n))
   *
   * assert.deepStrictEqual(length(2)("aa"), true)
   * assert.deepStrictEqual(length(2)("a"), false)
   * assert.deepStrictEqual(length(2)("aaa"), false)
   * ```
   *
   * @category combinators
   * @since 2.0.0
   */
  <A>(that: Predicate<A>): (self: Predicate<A>) => Predicate<A>;
  /**
   * Combines two predicates into a new predicate that returns `true` if both of the predicates returns `true`.
   *
   * @example
   * ```ts
   * import * as assert from "node:assert"
   * import { Predicate } from "effect"
   *
   * const minLength = (n: number) => (s: string) => s.length >= n
   * const maxLength = (n: number) => (s: string) => s.length <= n
   *
   * const length = (n: number) => Predicate.and(minLength(n), maxLength(n))
   *
   * assert.deepStrictEqual(length(2)("aa"), true)
   * assert.deepStrictEqual(length(2)("a"), false)
   * assert.deepStrictEqual(length(2)("aaa"), false)
   * ```
   *
   * @category combinators
   * @since 2.0.0
   */
  <A>(self: Predicate<A>, that: Predicate<A>): Predicate<A>;
} = dual(
  2,
  <A>(self: Predicate<A>, that: Predicate<A>): Predicate<A> =>
    (a) =>
      self(a) && that(a),
);

/**
 * @category combinators
 * @since 2.0.0
 */
const xor: {
  /**
   * @category combinators
   * @since 2.0.0
   */
  <A>(that: Predicate<A>): (self: Predicate<A>) => Predicate<A>;
  /**
   * @category combinators
   * @since 2.0.0
   */
  <A>(self: Predicate<A>, that: Predicate<A>): Predicate<A>;
} = dual(
  2,
  <A>(self: Predicate<A>, that: Predicate<A>): Predicate<A> =>
    (a) =>
      self(a) !== that(a),
);

/**
 * @category combinators
 * @since 2.0.0
 */
const eqv: {
  /**
   * @category combinators
   * @since 2.0.0
   */
  <A>(that: Predicate<A>): (self: Predicate<A>) => Predicate<A>;
  /**
   * @category combinators
   * @since 2.0.0
   */
  <A>(self: Predicate<A>, that: Predicate<A>): Predicate<A>;
} = dual(
  2,
  <A>(self: Predicate<A>, that: Predicate<A>): Predicate<A> =>
    (a) =>
      self(a) === that(a),
);

/**
 * Represents the logical implication combinator for predicates. In formal
 * logic, the implication operator `->` denotes that if the first proposition
 * (antecedent) is true, then the second proposition (consequent) must also be
 * true. In simpler terms, `p implies q` can be interpreted as "if p then q". If
 * the first predicate holds, then the second predicate must hold
 * for the given context.
 *
 * In practical terms within TypeScript, `p implies q` is equivalent to `!p || (p && q)`.
 *
 * Note that if the antecedent is `false`, the result is `true` by default
 * because the outcome of the consequent cannot be determined.
 *
 * This function is useful in situations where you need to enforce rules or
 * constraints that are contingent on certain conditions.
 * It proves especially helpful in defining property tests.
 *
 * The example below illustrates the transitive property of order using the
 * `implies` function. In simple terms, if `a <= b` and `b <= c`, then `a <= c`
 * must be true.
 *
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { Predicate } from "effect"
 *
 * type Triple = {
 *   readonly a: number
 *   readonly b: number
 *   readonly c: number
 * }
 *
 * const transitivity = Predicate.implies(
 *   // antecedent
 *   (input: Triple) => input.a <= input.b && input.b <= input.c,
 *   // consequent
 *   (input: Triple) => input.a <= input.c
 * )
 *
 * assert.equal(transitivity({ a: 1, b: 2, c: 3 }), true)
 * // antecedent is `false`, so the result is `true`
 * assert.equal(transitivity({ a: 1, b: 0, c: 0 }), true)
 * ```
 *
 * @category combinators
 * @since 2.0.0
 */
const implies: {
  /**
   * Represents the logical implication combinator for predicates. In formal
   * logic, the implication operator `->` denotes that if the first proposition
   * (antecedent) is true, then the second proposition (consequent) must also be
   * true. In simpler terms, `p implies q` can be interpreted as "if p then q". If
   * the first predicate holds, then the second predicate must hold
   * for the given context.
   *
   * In practical terms within TypeScript, `p implies q` is equivalent to `!p || (p && q)`.
   *
   * Note that if the antecedent is `false`, the result is `true` by default
   * because the outcome of the consequent cannot be determined.
   *
   * This function is useful in situations where you need to enforce rules or
   * constraints that are contingent on certain conditions.
   * It proves especially helpful in defining property tests.
   *
   * The example below illustrates the transitive property of order using the
   * `implies` function. In simple terms, if `a <= b` and `b <= c`, then `a <= c`
   * must be true.
   *
   * @example
   * ```ts
   * import * as assert from "node:assert"
   * import { Predicate } from "effect"
   *
   * type Triple = {
   *   readonly a: number
   *   readonly b: number
   *   readonly c: number
   * }
   *
   * const transitivity = Predicate.implies(
   *   // antecedent
   *   (input: Triple) => input.a <= input.b && input.b <= input.c,
   *   // consequent
   *   (input: Triple) => input.a <= input.c
   * )
   *
   * assert.equal(transitivity({ a: 1, b: 2, c: 3 }), true)
   * // antecedent is `false`, so the result is `true`
   * assert.equal(transitivity({ a: 1, b: 0, c: 0 }), true)
   * ```
   *
   * @category combinators
   * @since 2.0.0
   */
  <A>(consequent: Predicate<A>): (antecedent: Predicate<A>) => Predicate<A>;
  /**
   * Represents the logical implication combinator for predicates. In formal
   * logic, the implication operator `->` denotes that if the first proposition
   * (antecedent) is true, then the second proposition (consequent) must also be
   * true. In simpler terms, `p implies q` can be interpreted as "if p then q". If
   * the first predicate holds, then the second predicate must hold
   * for the given context.
   *
   * In practical terms within TypeScript, `p implies q` is equivalent to `!p || (p && q)`.
   *
   * Note that if the antecedent is `false`, the result is `true` by default
   * because the outcome of the consequent cannot be determined.
   *
   * This function is useful in situations where you need to enforce rules or
   * constraints that are contingent on certain conditions.
   * It proves especially helpful in defining property tests.
   *
   * The example below illustrates the transitive property of order using the
   * `implies` function. In simple terms, if `a <= b` and `b <= c`, then `a <= c`
   * must be true.
   *
   * @example
   * ```ts
   * import * as assert from "node:assert"
   * import { Predicate } from "effect"
   *
   * type Triple = {
   *   readonly a: number
   *   readonly b: number
   *   readonly c: number
   * }
   *
   * const transitivity = Predicate.implies(
   *   // antecedent
   *   (input: Triple) => input.a <= input.b && input.b <= input.c,
   *   // consequent
   *   (input: Triple) => input.a <= input.c
   * )
   *
   * assert.equal(transitivity({ a: 1, b: 2, c: 3 }), true)
   * // antecedent is `false`, so the result is `true`
   * assert.equal(transitivity({ a: 1, b: 0, c: 0 }), true)
   * ```
   *
   * @category combinators
   * @since 2.0.0
   */
  <A>(antecedent: Predicate<A>, consequent: Predicate<A>): Predicate<A>;
} = dual(
  2,
  <A>(antecedent: Predicate<A>, consequent: Predicate<A>): Predicate<A> =>
    (a) =>
      antecedent(a) ? consequent(a) : true,
);

/**
 * @category combinators
 * @since 2.0.0
 */
const nor: {
  /**
   * @category combinators
   * @since 2.0.0
   */
  <A>(that: Predicate<A>): (self: Predicate<A>) => Predicate<A>;
  /**
   * @category combinators
   * @since 2.0.0
   */
  <A>(self: Predicate<A>, that: Predicate<A>): Predicate<A>;
} = dual(
  2,
  <A>(self: Predicate<A>, that: Predicate<A>): Predicate<A> =>
    (a) =>
      !(self(a) || that(a)),
);

/**
 * @category combinators
 * @since 2.0.0
 */
const nand: {
  /**
   * @category combinators
   * @since 2.0.0
   */
  <A>(that: Predicate<A>): (self: Predicate<A>) => Predicate<A>;
  /**
   * @category combinators
   * @since 2.0.0
   */
  <A>(self: Predicate<A>, that: Predicate<A>): Predicate<A>;
} = dual(
  2,
  <A>(self: Predicate<A>, that: Predicate<A>): Predicate<A> =>
    (a) =>
      !(self(a) && that(a)),
);

/**
 * @category elements
 * @since 2.0.0
 */
const every =
  <A>(collection: Iterable<Predicate<A>>): Predicate<A> =>
  (a: A) => {
    for (const p of collection) {
      if (!p(a)) {
        return false;
      }
    }
    return true;
  };

/**
 * @category elements
 * @since 2.0.0
 */
const some =
  <A>(collection: Iterable<Predicate<A>>): Predicate<A> =>
  (a) => {
    for (const p of collection) {
      if (p(a)) {
        return true;
      }
    }
    return false;
  };
//#endregion

//#region Custom
/**
 * Prettifies a type by removing `readonly` and optional modifiers.
 * @template T - The type to prettify.
 * @typedef {object} Prettify
 */
type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

/**
 * Prettifies a function type by preserving its parameters and return type.
 * @template T - The function type to prettify.
 * @typedef {Function} PrettifyFunction
 */
type PrettifyFunction<T extends (...args: any[]) => any> = T extends (...args: infer P) => infer R
  ? (...args: P) => R
  : never;

/**
 * Gets the first element of an array.
 * @template T - The array type.
 * @typedef {any} Head
 */
type Head<T extends Array<any>> = T extends [infer U, ...infer _Rest] ? U : never;

/**
 * Gets the tail (all but the first element) of an array.
 * @template T - The array type.
 * @typedef {any[]} Tail
 */
type Tail<T extends any[]> = T extends [infer _U, ...infer Rest] ? Rest : never;

/**
 * Merges two objects, omitting properties from the second object that are also present in the first object.
 * @template T - The first object type.
 * @template U - The second object type.
 * @typedef {object} Merge
 */
type Merge<T, U> = Prettify<Omit<T, keyof U> & U>;

/**
 * Merges an array of objects into a single object.
 * @template T - The array of object types.
 * @typedef {any[]} MergeAll
 */
type MergeAll<T> = T extends []
  ? []
  : T extends [infer Head, ...infer Tail]
    ? [Merge<Head, Tail[0]>, ...MergeAll<Tail>]
    : [T];

/**
 * Creates a non-empty array type.
 * @template T - The element type.
 * @typedef {T[]} NonEmptyArray
 */
type NonEmptyArray<T> = [T, ...T[]];

/**
 * Splits a string into an array of strings using a delimiter.
 * @template S - The string to split.
 * @template D - The delimiter.
 * @typedef {string[]} Split
 */
type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ''
    ? []
    : S extends `${infer T}${D}${infer U}`
      ? [T, ...Split<U, D>]
      : [S];

/**
 * Joins an array of strings into a single string.
 * @template T - The array of strings.
 * @typedef {string} Join
 */
type Join<T> = T extends [infer F, ...infer R]
  ? R['length'] extends 0
    ? `${F & string}`
    : `${F & string}${Join<R>}`
  : never;

/**
 * Parses a string to a number.
 * @template T - The string to parse.
 * @typedef {number} ParseInt
 */
type ParseInt<T> = T extends `${infer N extends number}` ? N : never;

/**
 * Filters an array to an object based on a type.
 * @template T - The array type.
 * @template I - The type to filter by.
 * @typedef {object} FilterArrayToObject
 */
type FilterArrayToObject<T, I> = {
  [K in keyof T as T[K] extends I ? K : never]: T[K];
};

/**
 * Creates an array of a given length.
 * @template Length - The desired length.
 * @template T - The array type (internal use).
 * @typedef {unknown[]} ArrayOfLength
 */
type ArrayOfLength<Length extends number, T extends unknown[] = []> = T['length'] extends Length
  ? T
  : ArrayOfLength<Length, [...T, T['length']]>;

/**
 * Fills an array to a given length with a specified type.
 * @template T - The element type.
 * @template Length - The desired length.
 * @template Arr - The array type (internal use).
 * @typedef {T[]} Fill
 */
type Fill<T, Length extends number, Arr extends readonly T[] = []> = Arr['length'] extends Length
  ? Arr
  : Fill<T, Length, [T, ...Arr]>;

/**
 * Gets the element at a specific index in an array.
 * @template Arr - The array type.
 * @template Index - The index.
 * @typedef {unknown} GetIndex
 */
type GetIndex<Arr extends readonly unknown[], Index> = Index extends keyof Arr
  ? Arr[Index]
  : GetIndex<[...Arr, ...Arr], Index>;

/**
 * Flattens an array of arrays into a single array.
 * @template T - The array of arrays.
 * @typedef {unknown[]} Flatten
 */
type Flatten<T> = T extends [infer First extends unknown[], ...infer Rest extends unknown[][]]
  ? [...First, ...Flatten<Rest>]
  : [];

/**
 * Zips two arrays together into an array of pairs.
 * @template T - The first array.
 * @template U - The second array.
 * @typedef {Array<[any, any]>} Zip
 */
type Zip<T extends any[], U extends any[]> = T extends [infer A, ...infer RestT]
  ? U extends [infer B, ...infer RestU]
    ? [[A, B], ...Zip<RestT, RestU>]
    : []
  : [];

/**
 * Gets all paths of an object as arrays of keys.
 * @template T - The object type.
 * @typedef {Array<any>} Paths
 */
type Paths<T extends Record<string, any>> = keyof T extends never
  ? []
  : T extends object
    ? { [K in keyof T]: [K, ...Paths<T[K]>] }[keyof T]
    : [];

/**
 * Omits properties from an object based on their type.
 * @template T - The object type.
 * @template U - The type to omit.
 * @typedef {object} OmitByType
 */
type OmitByType<T, U> = T extends object
  ? {
      [K in keyof T as T[K] extends U ? never : K]: T[K];
    }
  : never;

/**
 * Makes all properties in an object and its nested objects partial (optional).
 * @template T - The object type.
 * @typedef {object} DeepPartial
 */
type DeepPartial<T extends object> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

/**
 * Makes all properties in an object and its nested objects required.
 * @template T - The object type.
 * @typedef {object} DeepRequired
 */
type DeepRequired<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
};

/**
 * Makes all properties in an object and its nested objects readonly.
 * @template T - The object type.
 * @typedef {object} DeepReadonly
 */
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

/**
 * Converts a union type to an intersection type.
 * @template U - The union type.
 * @typedef {any} UnionToIntersection
 */
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never;

/**
 * Removes index signatures from a type.
 * @template T - The object type.
 * @typedef {object} RemoveIndexSignature
 */
type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K];
};

/**
 * Makes all properties in an object and its nested objects non-nullable.
 * @template T - The object type.
 * @typedef {object} DeepNonNullable
 */
type DeepNonNullable<T> = {
  [K in keyof T]: T[K] extends object ? DeepNonNullable<T[K]> : NonNullable<T[K]>;
};

/**
 * Gets the type of all values in an object.
 * @template T - The object type.
 * @typedef {any} ValueOf
 */
type ValueOf<T> = T[keyof T];

/**
 * Makes at least one property required in a type.
 * @template T - The object type.
 * @template Keys - The keys to require at least one of.
 * @typedef {object} RequireAtLeastOne
 */
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

/**
 * Makes exactly one property required and the rest optional.
 * @template T - The object type.
 * @template Keys - The keys to require only one of.
 * @typedef {object} RequireOnlyOne
 */
type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, never>>;
  }[Keys];

/**
 * Gets the type inside a Promise.
 * @template T - The Promise type.
 * @typedef {any} Awaited
 */
type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;

/**
 * Makes all properties in an object and its nested objects mutable (removes readonly).
 * @template T - The object type.
 * @typedef {object} DeepMutable
 */
type DeepMutable<T> = {
  -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K];
};

/**
 * Creates a type without certain properties.
 * @template T - The base type.
 * @template U - The type whose properties to exclude.
 * @typedef {object} Without
 */
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

/**
 * Creates an exclusive OR (XOR) type between two types.
 * @template T - The first type.
 * @template U - The second type.
 * @typedef {object} XOR
 */
type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

/**
 * Like Pick but works with nested properties using dot notation.
 * @template T - The object type.
 * @template Paths - The dot-notated property paths.
 * @typedef {object} DeepPick
 */
type DeepPick<T, Paths extends string> = Prettify<{
  [P in Paths as P extends `${infer Key}.${infer Rest}`
    ? Key
    : P]: P extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
      ? DeepPick<T[Key], Rest>
      : never
    : P extends keyof T
      ? T[P]
      : never;
}>;

/**
 * Checks if two types are exactly equal.
 * @template T - The first type.
 * @template U - The second type.
 * @typedef {boolean} IsEqual
 */
type IsEqual<T, U> = (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U ? 1 : 2
  ? true
  : false;

/**
 * Converts a union type to a tuple type.
 * @template T - The union type.
 * @typedef {any[]} UnionToTuple
 */
type UnionToTuple<T> = UnionToIntersection<T extends any ? () => T : never> extends () => infer A
  ? [...UnionToTuple<Exclude<T, A>>, A]
  : [];

/**
 * Decrements a numeric type by one, up to 19.
 * @template N - The number to decrement.
 * @typedef {number} Decrement
 */
type Decrement<N extends number> = [
  -1,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
][N];

/**
 * Extracts the Nth property from a tuple.
 * @template T - The tuple type.
 * @template N - The index.
 * @typedef {any} ExtractNthProperty
 */
type ExtractNthProperty<T, N extends number> = T extends readonly [infer First, ...infer Rest]
  ? N extends 0
    ? First
    : ExtractNthProperty<Rest, Decrement<N>>
  : never;

/**
 * Extracts a property by name from an object.
 * @template T - The object type.
 * @template K - The property key.
 * @typedef {any} ExtractPropertyByName
 */
type ExtractPropertyByName<T, K extends keyof T> = T[K];

/**
 * Gets the type of the first argument of a function.
 * @template T - The function type.
 * @typedef {any} FirstArgument
 */
type FirstArgument<T> = T extends (first: infer First, ...args: any[]) => any ? First : never;

/**
 * Gets the types of all arguments of a function as a tuple.
 * @template T - The function type.
 * @typedef {any[]} AllArguments
 */
type AllArguments<T> = T extends (...args: infer Args) => any ? Args : never;

/**
 * Checks if a value is not null.
 *
 * @template Value
 * @param {Value} value - The value to check.
 * @returns {value is Exclude<Value, null>} Returns true if the value is not null, otherwise false.
 * @example
 * isNotNull(5); // true
 * isNotNull(null); // false
 */
declare const isNotNull = <Value>(value: Value): value is Exclude<Value, null> => {
  return value !== null;
};

/**
 * Returns a promise that resolves after a specified number of milliseconds.
 *
 * @template A extends number
 * @template R extends void
 * @param {A} n - The number of milliseconds to sleep.
 * @returns {Promise<R>} A promise that resolves after the specified delay.
 * @example
 * await sleep(1000); // Waits for 1 second
 */
declare const sleep = <A extends number, R extends void>(n: A): Promise<R> => {
  return new Promise((resolve) => setTimeout(resolve, n));
};


/**
 * Handles an error value by optionally transforming it with a provided function.
 *
 * This utility checks if the input `e` is an instance of `Error` (using `Error.isError`).
 * If it is an error and a handler function `fn` is provided, it calls the handler with the error and any additional arguments.
 * If it is an error and no handler is provided, it simply returns the error as is.
 * If the input is not an error, it returns the input unchanged.
 *
 * @template I - The type of the input value (can be an error or any other type).
 * @template O - The type returned by the handler function if provided.
 *
 * @param {I} e - The value to check and potentially handle if it is an error.
 * @param {(error: I, ...args: any[]) => O} [fn] - Optional handler function to process the error.
 * @param {...any} opts - Additional arguments to pass to the handler function if invoked.
 * @returns {I | O} Returns the original value if it is not an error, the error itself if no handler is provided, or the result of the handler function if provided.
 *
 * @example
 * // Returns the error unchanged if no handler is provided
 * const err = new Error("Something went wrong");
 * const result = error(err); // result === err
 *
 * @example
 * // Handles the error with a custom function
 * const err = new Error("Something went wrong");
 * const result = error(err, (e) => e.message); // result === "Something went wrong"
 *
 * @example
 * // Returns the value unchanged if it is not an error
 * const value = 42;
 * const result = error(value); // result === 42
 */
const error = <I, O>(
  e: I, 
  fn?: (error: I, ...args: any[]) => O, 
  ...opts: any[]
): I | O => {
  const isError = Error.isError(e);
  return isError 
    ? ( fn 
      ? fn(e, ...opts) 
      : e) 
    : e;
};
//#endregion
