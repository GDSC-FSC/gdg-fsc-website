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

import { ensureBaseError, isBaseError } from '@gdg-fsc/classes';
import { Effect, pipe } from 'effect';
import { Elysia } from 'elysia';

/**
 * Elysia plugin that provides Effect integration with BaseError support.
 *
 * Provides a `runEffect` decorator that:
 * - Runs Effect effects and converts them to Promises
 * - Wraps any errors in BaseError for consistent error handling
 * - Supports tagged errors from the Effect ecosystem
 */
export function effectPlugin() {
  return new Elysia({ name: 'effect' }).decorate(
    'runEffect',
    <A, E>(eff: Effect.Effect<A, E, never>, command = 'effect:run') => {
      // Map any errors to BaseError for consistent structure
      const wrappedEffect = pipe(
        eff,
        Effect.mapError((error) => {
          if (isBaseError(error)) {
            return error;
          }
          // Wrap unknown errors in BaseError
          return ensureBaseError(
            error instanceof Error ? error : new Error(String(error)),
            command,
          );
        }),
      );

      return Effect.runPromise(wrappedEffect);
    },
  );
}
