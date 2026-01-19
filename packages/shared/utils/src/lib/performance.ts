/**
 * Copyright 2026 GDG on Campus Farmingdale State College
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { perf } from '@jsheaven/perf';
import type { Algorithm, PerformanceResult } from './performance.types.js';

/**
 * Measures the performance characteristics of one or more algorithms
 * @param algorithms Single algorithm or array of algorithms to measure
 * @returns Object containing performance measurements for each algorithm
 */
export const measurePerformance = async (
  algorithms: Algorithm | Algorithm[],
  sizes?: number[],
  warm?: boolean,
  iterations?: number,
  maxExecutionTime?: number,
  chunkSize?: number | boolean,
): Promise<Record<string, PerformanceResult>> => {
  const algorithmArray = Array.isArray(algorithms) ? algorithms : [algorithms];

  try {
    const results = await perf(
      algorithmArray,
      sizes,
      warm,
      iterations,
      maxExecutionTime,
      chunkSize,
    );
    return Object.entries(results).reduce(
      (acc, [name, data]) => {
        acc[name] = {
          duration: data.duration,
          estimatedDomains: data.estimatedDomains,
        };
        return acc;
      },
      {} as Record<string, PerformanceResult>,
    );
  } catch (error) {
    console.error('Error measuring performance:', error);
    throw error;
  }
};

/**
 * Example usage:
 *
 * const bubbleSort: Algorithm = {
 *   name: 'BubbleSort',
 *   fn: (size) => {
 *     const arr = Array.from({ length: size }, () => Math.random())
 *     // ... sorting logic
 *   }
 * }
 *
 * const results = await measurePerformance(bubbleSort)
 * console.log(results.BubbleSort.duration)
 * console.log(results.BubbleSort.estimatedDomains)
 */
