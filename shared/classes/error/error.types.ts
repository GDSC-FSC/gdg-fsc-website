import { Data } from 'effect';
import type { ParseResult } from 'effect';

class BaseError extends Data.TaggedError("BaseError")<{
  cause: Error;
  command: string;
  parseResult?: ParseResult.ParseError;
}> {

  constructor(cause: Error, command: string) {
    super({ cause, command });
    this.name = "BaseError";
  }

  toString() {
    return `${this.name}: ${this.message} (Command: ${this.command})`;
  }
}

export class DatabaseDumpError extends BaseError {
  constructor(cause: Error, command: string) {
    super(cause, command);
    this.name = "DatabaseDumpError";
  }
}