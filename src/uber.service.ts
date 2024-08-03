import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UberRideModel } from './model/uberRideModel';
import { RideModel } from './model/rideModel';
import { CarType, Duration, RideProvider } from './constant';
import { DurationDTO } from './duration';

@Injectable()
export class UberService {
  getRideData() {
    const data = [
      // We assume that we are fetching this data from an external API
      new UberRideModel({
        id: 1,
        lowPrice: 15.0,
        highPrice: 20.0,
        rideLength: '15 mins',
        carType: 'Sedan',
      }),
    ];

    const result = data.map((ride) => {
      // Check for missing or malformed data
      if (!ride.rideLength || !ride.carType) {
        throw new HttpException('Invalid data format', HttpStatus.BAD_REQUEST);
      }

      const durationParts = ride.rideLength.split(' ');
      const duration = new DurationDTO(
        parseInt(durationParts[0], 10),
        durationParts[1],
      );

      const averagePrice = (ride.lowPrice + ride.highPrice) / 2;

      return new RideModel({
        id: ride.id,
        provider: RideProvider.UBER,
        price: averagePrice,
        duration: duration,
        carType: this.convertCarType(ride.carType),
      });
    });

    return result;
  }

  private convertCarType(carType: string): CarType {
    switch (carType) {
      case 'Sedan':
        return CarType.SEDAN;
      case 'SUV':
        return CarType.SUV;
      case 'Hatchback':
        return CarType.HATCHBACK;
      default:
        throw new HttpException('Invalid vehicle type', HttpStatus.BAD_REQUEST);
    }
  }
}
