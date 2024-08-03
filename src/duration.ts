import { Duration } from './constant';

export class DurationDTO implements Duration {
  constructor(
    public value: number,
    public unit: string,
  ) {}
}
