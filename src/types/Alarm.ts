export interface Alarm {
  hour: number;
  minute: number;
  dayOfWeek: number[];
  isEnabled: boolean;
  timezone: string;
}
