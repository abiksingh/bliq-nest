import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { DurationDTO } from './dto/DurationDto';
import { CarType, RideProvider } from './constants';
import { UberService } from './providers/uber.service';
import { BoltService } from './providers/bolt.service';

describe('RideController', () => {
  let rideController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, UberService, BoltService],
    }).compile();

    rideController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  it('should return normalized ride data', () => {
    const result = [
      {
        id: '9101d4f9-162b-4554-a770-af92a190dc43',
        provider: RideProvider.UBER,
        price: 15.0,
        duration: new DurationDTO(15, 'mins'),
        carType: CarType.SEDAN,
      },
      {
        id: '9b2d1f42-f786-40b9-9604-84d3f4b5c713',
        provider: RideProvider.BOLT,
        price: 18.0,
        duration: new DurationDTO(20, 'mins'),
        carType: CarType.SUV,
      },
    ];

    jest.spyOn(appService, 'getRideData').mockImplementation(() => result);

    expect(rideController.getRideData()).toEqual(result);
  });

  it('should throw an error for malformed data', () => {
    jest.spyOn(appService, 'getRideData').mockImplementation(() => {
      throw new HttpException('Invalid data format', HttpStatus.BAD_REQUEST);
    });

    try {
      rideController.getRideData();
    } catch (error) {
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.message).toBe('Invalid data format');
    }
  });

  it('should handle unexpected errors gracefully', () => {
    jest.spyOn(appService, 'getRideData').mockImplementation(() => {
      throw new Error('Unexpected Error');
    });

    try {
      rideController.getRideData();
    } catch (error) {
      expect(error.message).toBe('Unexpected Error');
    }
  });
});
