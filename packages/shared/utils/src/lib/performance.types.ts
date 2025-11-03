export interface Algorithm {
  name: string;
  fn: (size: number, callIndex: number, input?: string) => Promise<any> | any;
}

export type PerformanceResult = {
  duration: number;
  estimatedDomains: import('@jsheaven/perf').ComplexityDomain[];
};
