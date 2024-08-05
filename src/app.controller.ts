import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/rides')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getRideData() {
    try {
      return await this.appService.getRideData();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
