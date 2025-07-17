export type ActiveWorkers = Set<Worker>;

export type ThreadPoolResults = Map<string, import('../worker/worker.types').WorkerResult>;

export type ThreadPoolCallBacks = Map<string, [(result: any) => void, (error: any) => void]>;
