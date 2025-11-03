import { Redacted } from '../../../packages/shared/classes/src/lib/redacted/redacted';

describe('Redacted', () => {
  it('should create a Redacted instance and get value', () => {
    const r = Redacted.make('secret');
    expect(r).toBeInstanceOf(Redacted);
    expect(r.getValue()).toBe('secret');
    expect(r.valueOf()).toBe('secret');
  });

  it('should throw if value is null or undefined', () => {
    expect(() => Redacted.make(null as any)).toThrow('Value cannot be null or undefined');
    expect(() => Redacted.make(undefined as any)).toThrow('Value cannot be null or undefined');
  });

  it('should redact output for toString, toJSON, inspect, and util.inspect', () => {
    const r = Redacted.make('topsecret');
    expect(r.toString()).toBe('[REDACTED]');
    expect(r.toJSON()).toBe('[REDACTED]');
    expect(r.inspect()).toBe('[REDACTED]');
    // Simulate util.inspect.custom
    const custom = (r as any)[Symbol.for('nodejs.util.inspect.custom')];
    expect(typeof custom).toBe('function');
    expect(custom.call(r)).toBe('[REDACTED]');
  });

  it('should compare equality correctly', () => {
    const a = Redacted.make('foo');
    const b = Redacted.make('foo');
    const c = Redacted.make('bar');
    expect(a.equals(b)).toBe(true);
    expect(a.equals(c)).toBe(false);
    expect(a.equals({} as any)).toBe(false);
  });

  it('should type guard with isRedacted', () => {
    const r = Redacted.make('x');
    expect(Redacted.isRedacted(r)).toBe(true);
    expect(Redacted.isRedacted('x')).toBe(false);
  });
});
