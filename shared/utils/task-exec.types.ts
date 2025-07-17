export type TimedTask = {
  func: (...args: any) => any;
  execTime: number;
};
