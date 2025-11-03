export type TimerHandle = NodeJS.Timeout | NodeJS.Immediate;

export interface TimerEntry {
  id: TimerHandle;
  type: 'timeout' | 'interval' | 'immediate';
  created: number;
  callback: () => void;
}
