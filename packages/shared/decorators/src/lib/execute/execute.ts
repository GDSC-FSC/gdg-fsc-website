export const selfExecute = <T extends { new (...args: any[]): {} }>(constructor: T): T => {
  new constructor();
  return constructor;
};
