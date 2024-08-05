import { Duration } from '../constants';

export class DurationDTO implements Duration {
  constructor(
    public value: number,
    public unit: string,
  ) {}
}
