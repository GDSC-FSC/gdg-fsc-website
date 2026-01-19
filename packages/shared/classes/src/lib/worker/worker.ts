// @ts-check

/**
 * Copyright 2025 GDG on Campus Farmingdale State College
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

import type { WorkerMessage, WorkerResult } from './worker.types.js';

export class WorkerThread {
  private readonly taskHandlers: Map<string, (data: any) => Promise<any>> = new Map();

  constructor() {
    // Register message handler
    globalThis.onmessage = this.handleMessage.bind(this);

    // Register default task handlers
    this.registerTaskHandler('DEFAULT', async (data) => {
      // Default task implementation
      return data;
    });
  }

  private async handleMessage(event: MessageEvent<WorkerMessage>) {
    const { id, type, payload } = event.data;

    if (type === 'TASK') {
      try {
        const startTime = performance.now();
        const handler = this.taskHandlers.get(payload.type) || this.taskHandlers.get('DEFAULT');

        if (!handler) {
          throw new Error(`No handler registered for task type: ${payload.type}`);
        }

        const result = await handler(payload.data);
        const executionTime = performance.now() - startTime;

        const response: WorkerMessage<WorkerResult> = {
          id,
          type: 'RESULT',
          payload: {
            taskId: payload.id,
            result,
            executionTime,
          },
          timestamp: Date.now(),
        };

        self.postMessage(response);
      } catch (error) {
        const errorResponse: WorkerMessage = {
          id,
          type: 'ERROR',
          payload: {
            taskId: payload.id,
            error: Error.isError(error) ? error.message : String(error),
          },
          timestamp: Date.now(),
        };

        self.postMessage(errorResponse);
      }
    }
  }

  public registerTaskHandler(type: string, handler: (data: any) => Promise<any>) {
    this.taskHandlers.set(type, handler);
  }
}

/**
// Initialize worker
const worker = new WorkerThread();

// Register task handlers
worker.registerTaskHandler('COMPUTE_INTENSIVE', async (data) => {
    // Example compute-intensive task
    let result = 0;
    for (let i = 0; i < data.iterations; i++) {
        result += Math.sqrt(i);
    }
    return result;
});
*/
