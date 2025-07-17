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

export interface WorkerMessage<T = any> {
  id: string;
  type: 'TASK' | 'RESULT' | 'ERROR' | 'STATUS';
  payload: T;
  timestamp: number;
}

export interface WorkerTask {
  id: string;
  data: any;
  type: string;
}

export interface WorkerResult {
  taskId: string;
  result: any;
  error?: string;
  executionTime?: number;
}
