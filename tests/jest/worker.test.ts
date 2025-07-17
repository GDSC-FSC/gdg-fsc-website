import { WorkerThread } from '../../shared/classes/worker/worker';

describe('WorkerThread', () => {
  let originalSelf: any;
  let postMessageMock: jest.Mock;

  beforeEach(() => {
    originalSelf = globalThis.global;
    postMessageMock = jest.fn();
    // @ts-ignore
    globalThis.self = { postMessage: postMessageMock };
  });

  afterEach(() => {
    globalThis.self = originalSelf;
    jest.clearAllMocks();
  });

  it('should register and call a custom handler', async () => {
    const worker = new WorkerThread();
    const handler = jest.fn().mockResolvedValue('ok');
    worker.registerTaskHandler('FOO', handler);
    const event = { data: { id: '1', type: 'TASK', payload: { id: '1', type: 'FOO', data: 123 } } };
    await worker['handleMessage'](event as any);
    expect(handler).toHaveBeenCalledWith(123);
    expect(postMessageMock).toHaveBeenCalledWith(expect.objectContaining({ type: 'RESULT' }));
  });

  it('should use default handler if none registered', async () => {
    const worker = new WorkerThread();
    const event = { data: { id: '2', type: 'TASK', payload: { id: '2', type: 'UNKNOWN', data: 456 } } };
    await worker['handleMessage'](event as any);
    expect(postMessageMock).toHaveBeenCalledWith(expect.objectContaining({ type: 'RESULT' }));
  });

  it('should send error if handler throws', async () => {
    const worker = new WorkerThread();
    worker.registerTaskHandler('ERR', async () => { throw new Error('fail'); });
    const event = { data: { id: '3', type: 'TASK', payload: { id: '3', type: 'ERR', data: null } } };
    await worker['handleMessage'](event as any);
    expect(postMessageMock).toHaveBeenCalledWith(expect.objectContaining({ type: 'ERROR' }));
  });
});
