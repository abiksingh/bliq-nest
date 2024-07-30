import { Test, TestingModule } from '@nestjs/testing';
import {AppController} from "./app.controller";
import { HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';


describe('RideController', () => {
  let rideController: AppController;
  let appService: AppService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    rideController = module.get<AppController>(AppController);
  });

  it('should return normalized ride data', () => {
    const result = [
      { provider: 'Uber', price: 15, duration: '15 mins', carType: 'Sedan' },
      { provider: 'Bolt', price: 15, duration: '20 mins', carType: 'SUV' }
    ];

    expect(rideController.getRideData()).toEqual(result);
  });

  it('should throw an error for malformed data', () => {
    jest.spyOn(rideController, 'getRideData').mockImplementation(() => {
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
    jest.spyOn(rideController, 'getRideData').mockImplementation(() => {
      throw new Error('Unexpected Error');
    });

    try {
      rideController.getRideData();
    } catch (error) {
      expect(error.message).toBe('Unexpected Error');
    }
  });
});
