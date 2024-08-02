import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Duration } from './duration';

@Injectable()
export class AppService {
  getRideData() {
    const rawData = [
      {
        id: 1,
        provider: 'Uber',
        price: 15.0,
        duration: '15 mins',
        carType: 'Sedan',
      },
      {
        id: 2,
        provider: 'Bolt',
        lowPrice: 12.0,
        highPrice: 18.0,
        duration: '20 mins',
        carType: 'SUV',
      },
    ];

    // Normalize data
    const normalizedData = rawData.map((ride) => {
      let price = ride.price;

      // If lowPrice and highPrice exist, calculate the average price
      if (ride.lowPrice !== undefined && ride.highPrice !== undefined) {
        price = (ride.lowPrice + ride.highPrice) / 2;
      }

      // Check for missing or malformed data
      if (!ride.provider || !ride.duration || !ride.carType) {
        throw new HttpException('Invalid data format', HttpStatus.BAD_REQUEST);
      }

      // Parse duration
      const durationParts = ride.duration.split(' ');
      const duration = new Duration(
        parseInt(durationParts[0], 10),
        durationParts[1],
      );

      return {
        provider: ride.provider,
        price: price,
        duration: duration,
        carType: ride.carType,
      };
    });

    return normalizedData;
  }
}
