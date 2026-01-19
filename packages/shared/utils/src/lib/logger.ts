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

import { Effect, Logger as EffectLogger, LogLevel as EffectLogLevel } from 'effect';

/**
 * @fileoverview A comprehensive logging utility for both client and server environments.
 * Provides structured logging with support for different log levels, colorization,
 * and contextual information.
 */

/**
 * Determines if the code is running in a server environment
 */

/**
 * Enum representing different logging levels with their priority values.
 * Higher values indicate more verbose logging.
 * @enum {number}
 */
export enum LogLevel {
  /** No logging */
  NONE = 0,
  /** Only error messages */
  ERROR = 1,
  /** Errors and warnings */
  WARN = 2,
  /** Errors, warnings, and informational messages */
  INFO = 3,
  /** Errors, warnings, info, and debug messages */
  DEBUG = 4,
  /** Errors, warnings, info, debug, and trace messages */
  TRACE = 5,
  /** All possible log messages */
  ALL = 6,
}

/**
 * Available color keys for log formatting
 * @typedef {'reset' | 'red' | 'yellow' | 'blue' | 'green' | 'gray' | 'bold' | 'magenta' | 'cyan' | 'white'} ColorKey
 */
export type ColorKey =
  | 'reset'
  | 'red'
  | 'yellow'
  | 'blue'
  | 'green'
  | 'gray'
  | 'bold'
  | 'magenta'
  | 'cyan'
  | 'white';

/**
 * Interface for structured data that can be attached to log messages
 * @interface
 */
export interface LogData {
  /**
   * Any key-value pairs to include in the log
   */
  [key: string]: unknown;
}

/**
 * Configuration options for the Logger
 * @interface
 */
export interface LoggerOptions {
  /**
   * The minimum level of messages to log
   */
  minLevel?: LogLevel;

  /**
   * Whether to include timestamps in log messages
   */
  includeTimestamp?: boolean;

  /**
   * Whether to colorize log output
   */
  colorize?: boolean;

  /**
   * Whether to write logs to a file (server-side only)
   */
  logToFile?: boolean;

  /**
   * Path to the log file if logToFile is enabled
   */
  filePath?: string;
}

/**
 * A versatile logging utility that works in both browser and Node.js environments.
 * Supports multiple log levels, colorized output, and structured data logging.
 */
export class Logger {
  /** The context/category name for this logger instance */
  private readonly context: string;

  /** The minimum log level that will be output */
  private minLevel: LogLevel;

  /** Registry of logger instances to implement the singleton pattern */
  private static readonly instances: Map<string, Logger> = new Map();

  /**
   * Create a new Logger instance or return an existing one for the given context
   * @param {string} context - The context name for this logger (e.g., component or service name)
   * @param {LoggerOptions} [options={}] - Optional logger configuration
   */
  constructor(context: string, options: LoggerOptions = {}) {
    this.context = context;

    this.minLevel =
      options.minLevel ?? (process.env.NODE_ENV === 'production' ? LogLevel.ERROR : LogLevel.ALL);
  }

  /**
   * Get a logger instance for the given context.
   * If a logger with this context already exists, returns the existing instance.
   *
   * @param {string} context - The context name
   * @param {LoggerOptions} [options] - Optional logger configuration
   * @returns {Logger} A logger instance for the specified context
   */
  public static getLogger(context: string, options?: LoggerOptions): Logger {
    let instance = Logger.instances.get(context);

    if (!instance) {
      instance = new Logger(context, options);
      Logger.instances.set(context, instance);
    }

    return instance;
  }

  /**
   * Set global minimum log level for all logger instances
   *
   * @param {LogLevel} level - The minimum level to log across all loggers
   */
  public static setGlobalLogLevel(level: LogLevel): void {
    Logger.instances.forEach((logger) => {
      logger.minLevel = level;
    });
  }

  /**
   * Maps internal LogLevel to Effect's LogLevel
   */
  private getEffectLogLevel(level: LogLevel): EffectLogLevel.LogLevel {
    switch (level) {
      case LogLevel.NONE:
        return EffectLogLevel.None;
      case LogLevel.ERROR:
        return EffectLogLevel.Error;
      case LogLevel.WARN:
        return EffectLogLevel.Warning;
      case LogLevel.INFO:
        return EffectLogLevel.Info;
      case LogLevel.DEBUG:
        return EffectLogLevel.Debug;
      case LogLevel.TRACE:
        return EffectLogLevel.Debug; // Effect doesn't have Trace, mapping to Debug
      case LogLevel.ALL:
        return EffectLogLevel.All;
      default:
        return EffectLogLevel.Info;
    }
  }

  /**
   * Run an effect with the logger's context and configuration
   */
  private run(effect: Effect.Effect<void>) {
    // Determine the minimum log level for this execution
    const minEffectLevel = this.getEffectLogLevel(this.minLevel);

    // Apply context and log level configuration
    const program = effect.pipe(
      Effect.annotateLogs({ context: this.context }),
      EffectLogger.withMinimumLogLevel(minEffectLevel),
    );

    // If the configured minLevel is higher (less verbose) than what we want to log,
    // Effect's default logger might still show it if we don't configure it.
    // But since we are just wrapping Effect.log*, we can just run it.
    // To strictly enforce minLevel per instance, we would need a custom logger layer.
    // For now, we'll assume the global configuration or default is acceptable,
    // or we can manually check before running.

    // Manual check to match previous behavior's strictness
    // (This is a bit redundant with Effect's own level handling but ensures backward compat)
    // We'll skip the manual check here and let Effect handle it, assuming standard usage.
    // If we strictly need to suppress, we can do:
    // if (this.getEffectLogLevel(this.minLevel).ordinal > ... ) return;

    try {
      Effect.runSync(Effect.scoped(program));
    } catch (error) {
      // Fallback if Effect fails (shouldn't happen for standard logging)
      console.error('Logger failed:', error);
    }
  }

  /**
   * Log an informational message
   *
   * @param {string} message - The message to log
   * @param {LogData} [data] - Optional data to include
   */
  info(message: string, data?: LogData): void {
    if (this.minLevel < LogLevel.INFO) return;
    this.run(Effect.logInfo(message).pipe(Effect.annotateLogs(data || {})));
  }

  /**
   * Log an error message
   *
   * @param {string} message - The error message
   * @param {Error|unknown} [error] - Optional Error object or unknown error
   * @param {LogData} [data] - Optional additional data
   */
  error(message: string, error?: unknown, data?: LogData): void {
    if (this.minLevel < LogLevel.ERROR) return;

    let errorObj: unknown = error;
    if (error instanceof Error) {
      errorObj = { name: error.name, message: error.message, stack: error.stack };
    }

    this.run(Effect.logError(message).pipe(Effect.annotateLogs({ ...data, error: errorObj })));
  }

  /**
   * Log a warning message
   *
   * @param {string} message - The warning message
   * @param {LogData} [data] - Optional data to include
   */
  warn(message: string, data?: LogData): void {
    if (this.minLevel < LogLevel.WARN) return;
    this.run(Effect.logWarning(message).pipe(Effect.annotateLogs(data || {})));
  }

  /**
   * Log a debug message
   *
   * @param {string} message - The debug message
   * @param {LogData} [data] - Optional data to include
   */
  debug(message: string, data?: LogData): void {
    if (this.minLevel < LogLevel.DEBUG) return;
    this.run(Effect.logDebug(message).pipe(Effect.annotateLogs(data || {})));
  }

  /**
   * Log a trace message (most verbose level)
   *
   * @param {string} message - The trace message
   * @param {LogData} [data] - Optional data to include
   */
  trace(message: string, data?: LogData): void {
    if (this.minLevel < LogLevel.TRACE) return;
    // Mapping trace to debug as Effect doesn't have a distinct trace level exposed easily
    this.run(Effect.logDebug(message).pipe(Effect.annotateLogs({ ...data, level: 'TRACE' })));
  }

  /**
   * Log an action message (for server actions or important user interactions)
   *
   * @param {string} message - The action message
   * @param {LogData} [data] - Optional data to include
   */
  action(message: string, data?: LogData): void {
    if (this.minLevel < LogLevel.INFO) return;
    // Action is effectively Info but we tag it
    this.run(Effect.logInfo(message).pipe(Effect.annotateLogs({ ...data, type: 'ACTION' })));
  }

  /**
   * Log a success message
   *
   * @param {string} message - The success message
   * @param {LogData} [data] - Optional data to include
   */
  success(message: string, data?: LogData): void {
    if (this.minLevel < LogLevel.INFO) return;
    // Success is effectively Info but we tag it
    this.run(Effect.logInfo(message).pipe(Effect.annotateLogs({ ...data, type: 'SUCCESS' })));
  }

  /**
   * Group related log messages (Console.group wrapper)
   *
   * @param {string} label - The group label
   */
  group(label: string): void {
    if (this.minLevel < LogLevel.INFO) return;
    // Effect doesn't have a direct equivalent for console.group in its Logger
    // We can use Console.group directly as it's a wrapper around console.group
    // but we should be careful about mixing Effect logs and direct console logs.
    // For now, we'll use the direct Console import from effect which wraps console.
    // Note: This might not respect Effect's structured logging output format for the group header itself.
    console.group(label);
  }

  /**
   * End a log group (Console.groupEnd wrapper)
   */
  groupEnd(): void {
    if (this.minLevel < LogLevel.INFO) return;
    console.groupEnd();
  }

  /**
   * Log execution time of a function
   *
   * @template T - The return type of the function being timed
   * @param {string} label - Description of the operation being timed
   * @param {() => Promise<T> | T} fn - Function to execute and time
   * @returns {Promise<T>} The result of the function execution
   */
  async time<T>(label: string, fn: () => Promise<T> | T): Promise<T> {
    if (this.minLevel < LogLevel.DEBUG) return fn();

    // We can use Effect.timed if we wrap the function in an Effect,
    // but since fn returns a Promise or value, we might just want to measure it manually
    // to avoid wrapping everything in Effect if the consumer isn't using Effect.

    const startTime = performance.now();
    try {
      const result = await fn();
      const endTime = performance.now();
      const duration = (endTime - startTime).toFixed(2);
      this.info(`${label} completed`, { duration: `${duration}ms` });
      return result;
    } catch (error) {
      const endTime = performance.now();
      const duration = (endTime - startTime).toFixed(2);
      this.error(`${label} failed`, error, { duration: `${duration}ms` });
      throw error;
    }
  }
}

export const logger = new Logger('[LOGGER]', {
  includeTimestamp: true,
  colorize: true,
});
