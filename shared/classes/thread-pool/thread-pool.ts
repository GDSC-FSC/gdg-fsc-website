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

import type { WorkerMessage, WorkerResult, WorkerTask } from '../worker/worker.types';
import type { ActiveWorkers, ThreadPoolCallBacks, ThreadPoolResults } from './thread-pool.types';

export class ThreadPool {
  private workers: Worker[] = [];
  private taskQueue: WorkerTask[] = [];
  private activeWorkers: ActiveWorkers = new Set();
  private results: ThreadPoolResults = new Map();
  private callbacks: ThreadPoolCallBacks = new Map();
  private workerScript: string;
  private maxWorkers: number;

  constructor(workerScript: string, maxWorkers = navigator.hardwareConcurrency || 4) {
    this.workerScript = workerScript;
    this.maxWorkers = maxWorkers;
  }

  private createWorker(): Worker {
    const worker = new Worker(this.workerScript, { type: 'module' });

    worker.onmessage = (event: MessageEvent<WorkerMessage>) => {
      const { id, type, payload } = event.data;

      if (type === 'RESULT' || type === 'ERROR') {
        this.handleWorkerComplete(worker, id, payload);
      }
    };

    worker.onerror = (error) => {
      console.error('Worker error:', error);
      this.handleWorkerError(worker, error);
    };

    return worker;
  }

  private handleWorkerComplete(worker: Worker, taskId: string, result: WorkerResult) {
    this.activeWorkers.delete(worker);
    this.results.set(taskId, result);

    const callbacks = this.callbacks.get(taskId);
    if (callbacks) {
      const [resolve, reject] = callbacks;
      if (result.error) {
        reject(result.error);
      } else {
        resolve(result.result);
      }
      this.callbacks.delete(taskId);
    }

    this.processNextTask();
  }

  private handleWorkerError(worker: Worker, error: ErrorEvent) {
    this.activeWorkers.delete(worker);
    worker.terminate();
    console.error('[Worker error]', error.message);
    const index = this.workers.indexOf(worker);
    if (index !== -1) {
      this.workers.splice(index, 1);
    }
    this.processNextTask();
  }

  private async processNextTask() {
    if (this.taskQueue.length === 0) return;

    let worker: Worker | undefined;

    // Reuse existing idle worker
    for (const w of this.workers) {
      if (!this.activeWorkers.has(w)) {
        worker = w;
        break;
      }
    }

    // Create new worker if needed and possible
    if (!worker && this.workers.length < this.maxWorkers) {
      worker = this.createWorker();
      this.workers.push(worker);
    }

    if (worker) {
      const task = this.taskQueue.shift();
      if (task) {
        this.activeWorkers.add(worker);
        const message: WorkerMessage = {
          id: task.id,
          type: 'TASK',
          payload: task,
          timestamp: Date.now(),
        };
        worker.postMessage(message);
      }
    }
  }

  public async submitTask<T = any>(type: string, data: any): Promise<T> {
    const task: WorkerTask = {
      id: crypto.randomUUID(),
      type,
      data,
    };

    return new Promise((resolve, reject) => {
      this.callbacks.set(task.id, [resolve, reject]);
      this.taskQueue.push(task);
      this.processNextTask();
    });
  }

  public shutdown() {
    for (const worker of this.workers) {
      worker.terminate();
    }
    this.workers = [];
    this.activeWorkers.clear();
    this.taskQueue = [];
    this.callbacks.clear();
    this.results.clear();
  }

  public getActiveTaskCount(): number {
    return this.activeWorkers.size;
  }

  public getQueuedTaskCount(): number {
    return this.taskQueue.length;
  }

  public getAllResults(): Map<string, WorkerResult> {
    return new Map(this.results);
  }
}

/**
  async function example() {
    // Initialize thread pool
    const threadPool = new ThreadPool('worker.js');

    try {
        // Submit multiple tasks
        const tasks = [];
        for (let i = 0; i < 10; i++) {
            const task = threadPool.submitTask('COMPUTE_INTENSIVE', {
                iterations: 1000000
            });
            tasks.push(task);
        }

        // Wait for all tasks to complete
        const results = await Promise.all(tasks);
        console.log('All tasks completed:', results);

        // Get execution statistics
        const allResults = threadPool.getAllResults();
        const totalExecutionTime = Array.from(allResults.values())
            .reduce((sum, result) => sum + (result.executionTime || 0), 0);
        
        console.log('Total execution time:', totalExecutionTime);
    } catch (error) {
        console.error('Error executing tasks:', error);
    } finally {
        // Clean up
        threadPool.shutdown();
    }
  }
*/
