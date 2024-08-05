import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UberService } from './providers/uber.service';
import { BoltService } from './providers/bolt.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UberService, BoltService],
})
export class AppModule {}
