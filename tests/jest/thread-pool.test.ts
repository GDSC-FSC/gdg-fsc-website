import { ThreadPool } from '../../shared/classes/thread-pool/thread-pool';

describe('ThreadPool', () => {
  let OriginalWorker: typeof globalThis.Worker;
  let mockPostMessage: jest.Mock;
  let mockTerminate: jest.Mock;
  let workerId = 0;

  beforeAll(() => {
    OriginalWorker = global.Worker;
    // @ts-ignore
    global.Worker = jest.fn().mockImplementation(() => {
      const id = ++workerId;
      mockPostMessage = jest.fn();
      mockTerminate = jest.fn();
      return {
        postMessage: mockPostMessage,
        terminate: mockTerminate,
        onmessage: null,
        onerror: null,
        id,
      };
    });
  });

  afterAll(() => global.Worker = OriginalWorker);

  beforeEach(() => (
    workerId = 0,
    jest.clearAllMocks()
  ));

  it('should submit a task and resolve result', async () => {
    const pool = new ThreadPool('worker.js', 1);
    // Simulate worker message
    setTimeout(() => {
      // @ts-ignore
      pool['workers'][0].onmessage({ data: { id: expect.any(String), type: 'RESULT', payload: { result: 42 } } });
    }, 10);
    const result = await pool.submitTask('TYPE', { foo: 'bar' });
    expect(result).toBe(42);
    expect(mockPostMessage).toHaveBeenCalled();
  });

  it('should queue tasks if maxWorkers is reached', async () => {
    const pool = new ThreadPool('worker.js', 1);
    let resolveTask: (v: any) => void;
    const taskPromise = new Promise((resolve) => { resolveTask = resolve; });
    // Simulate worker message for first task
    setTimeout(() => {
      // @ts-ignore
      pool['workers'][0].onmessage({ data: { id: expect.any(String), type: 'RESULT', payload: { result: 'first' } } });
      resolveTask('first');
    }, 10);
    const p1 = pool.submitTask('TYPE', {});
    const p2 = pool.submitTask('TYPE', {});
    // Simulate worker message for second task
    setTimeout(() => {
      // @ts-ignore
      pool['workers'][0].onmessage({ data: { id: expect.any(String), type: 'RESULT', payload: { result: 'second' } } });
    }, 30);
    expect(await p1).toBe('first');
    expect(await p2).toBe('second');
  });

  it('should call shutdown and clear all', () => {
    const pool = new ThreadPool('worker.js', 2);
    pool['workers'].push({ terminate: mockTerminate } as any);
    pool.shutdown();
    expect(mockTerminate).toHaveBeenCalled();
    expect(pool.getActiveTaskCount()).toBe(0);
    expect(pool.getQueuedTaskCount()).toBe(0);
    expect(pool.getAllResults().size).toBe(0);
  });

  it('should handle worker error', () => {
    const pool = new ThreadPool('worker.js', 1);
    pool['workers'].push({ terminate: mockTerminate } as any);
    pool['activeWorkers'].add(pool['workers'][0]!);
    pool['handleWorkerError'](pool['workers'][0]!, { message: 'fail' } as any);
    expect(mockTerminate).toHaveBeenCalled();
    expect(pool['workers'].length).toBe(0);
    expect(pool.getActiveTaskCount()).toBe(0);
  });
});
