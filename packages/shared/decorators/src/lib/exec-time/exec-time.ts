import { execTimeFn } from './exec-time.fn.ts';
import type { ExactTimeReportable, ReportFunction } from './exec-time.types.ts';

export function execTime<T = any>(arg?: ReportFunction | string): ExactTimeReportable<T> {
  return (
    target: T,
    propertyName: keyof T,
    descriptor: TypedPropertyDescriptor<Method<any>>,
  ): TypedPropertyDescriptor<Method<any>> => {
    if (descriptor.value) {
      descriptor.value = execTimeFn(descriptor.value, arg);

      return descriptor;
    }

    throw new Error('@execTime is applicable only on a methods.');
  };
}
