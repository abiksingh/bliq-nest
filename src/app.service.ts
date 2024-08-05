import { Injectable } from '@nestjs/common';
import { BoltService } from './providers/bolt.service';
import { UberService } from './providers/uber.service';

@Injectable()
export class AppService {
  constructor(
    private boltService: BoltService,
    private uberService: UberService,
  ) {}

  getRideData() {
    const boltData = this.boltService.getRideData();
    const uberData = this.uberService.getRideData();

    return [...boltData, ...uberData];
  }
}
