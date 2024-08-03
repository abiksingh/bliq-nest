import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RideModel } from './model/rideModel';
import { CarType, RideProvider } from './constant';
import { DurationDTO } from './duration';
import { BoltRideModel } from './model/boltRideModel';

@Injectable()
export class BoltService {
  getRideData() {
    const data = [
      // We assume that we are fetching this data from an external API
      new BoltRideModel({
        id: 1,
        price: 18.0,
        rideLength: '15 mins',
        vehicleType: 'Sedan',
      }),
    ];

    const result = data.map((ride) => {
      // Check for missing or malformed data
      if (!ride.rideLength || !ride.vehicleType) {
        throw new HttpException('Invalid data format', HttpStatus.BAD_REQUEST);
      }

      const durationParts = ride.rideLength.split(' ');
      const duration = new DurationDTO(
        parseInt(durationParts[0], 10),
        durationParts[1],
      );

      return new RideModel({
        id: ride.id,
        provider: RideProvider.BOLT,
        price: ride.price,
        duration: duration,
        carType: this.convertVehicleType(ride.vehicleType),
      });
    });

    return result;
  }

  private convertVehicleType(vehicleType: string): CarType {
    switch (vehicleType) {
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
