import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/rides')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRideData() {
    try {
      return this.appService.getRideData();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
