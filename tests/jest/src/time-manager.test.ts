import { TimerManager } from '../../../packages/shared/classes/src/lib/time-manager/time-manager';

describe('TimerManager', () => {
  let tm: TimerManager;
  beforeEach(() => {
    tm = new TimerManager();
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('should create and clear a timeout', () => {
    const cb = jest.fn();
    const id = tm.timeout(100, cb);
    expect(tm.activeCount).toBe(1);
    jest.advanceTimersByTime(100);
    expect(cb).toHaveBeenCalled();
    expect(tm.activeCount).toBe(0);
  });

  it('should create and clear an interval', () => {
    const cb = jest.fn();
    const id = tm.interval(50, cb);
    expect(tm.activeCount).toBe(1);
    jest.advanceTimersByTime(150);
    expect(cb).toHaveBeenCalledTimes(3);
    tm.clear(id);
    expect(tm.activeCount).toBe(0);
  });

  it('should create and clear an immediate', () => {
    const cb = jest.fn();
    const id = tm.immediate(cb);
    expect(tm.activeCount).toBe(1);
    jest.runAllImmediates();
    expect(cb).toHaveBeenCalled();
    expect(tm.activeCount).toBe(0);
  });

  it('should clear all timers', () => {
    const cb = jest.fn();
    const t1 = tm.timeout(100, cb);
    const t2 = tm.interval(100, cb);
    const t3 = tm.immediate(cb);
    expect(tm.activeCount).toBe(3);
    tm.clearAll();
    expect(tm.activeCount).toBe(0);
  });

  it('should clear timers by type', () => {
    const cb = jest.fn();
    tm.timeout(100, cb);
    tm.interval(100, cb);
    tm.immediate(cb);
    expect(tm.activeCount).toBe(3);
    tm.clearByType('timeout');
    expect(tm.activeCount).toBe(2);
    tm.clearByType('interval');
    expect(tm.activeCount).toBe(1);
    tm.clearByType('immediate');
    expect(tm.activeCount).toBe(0);
  });

  it('should get active timers info', () => {
    const cb = jest.fn();
    tm.timeout(100, cb);
    const timers = tm.getActiveTimers();
    expect(Array.isArray(timers)).toBe(true);
    expect(timers[0]).toHaveProperty('type');
    expect(timers[0]).toHaveProperty('created');
    expect(timers[0]).toHaveProperty('age');
  });

  it('should run withTimers and cleanup', async () => {
    const cb = jest.fn();
    await tm.withTimers(async (tm2) => {
      tm2.timeout(100, cb);
      expect(tm2.activeCount).toBe(1);
    });
    expect(tm.activeCount).toBe(0);
  });

  it('should dispose and prevent further use', () => {
    tm.dispose();
    expect(() => tm.timeout(10, jest.fn())).toThrow('TimerManager has been disposed');
  });
});
