export function delegateFn<D = any, A extends any[] = any[]>(
  originalMethod: AsyncMethod<D, A>,
  keyResolver?: (...args: A) => string,
): AsyncMethod<D, A> {
  const delegatedKeysMap = new Map<string, Promise<any>>();
  const keyGenerator: (...args: any[]) => string =
    keyResolver ?? ((...args) => JSON.stringify(args));

  return (...args: A): Promise<D> => {
    const key = keyGenerator(...args);

    if (!delegatedKeysMap.has(key)) {
      delegatedKeysMap.set(
        key,
        originalMethod.apply(this, args).finally(() => delegatedKeysMap.delete(key)),
      );
    }

    return delegatedKeysMap.get(key);
  };
}
