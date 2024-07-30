import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

@Injectable()
export class AppService {
  getRideData() {
    const rawData = [
      {
        provider: "Uber",
        price: 15.00,
        duration: "15 mins",
        carType: "Sedan"
      },
      {
        provider: "Bolt",
        lowPrice: 12.00,
        highPrice: 18.00,
        duration: "20 mins",
        carType: "SUV"
      }
    ];

    // Normalize data
    const normalizedData = rawData.map(ride => {
      let price = ride.price;

      // If lowPrice and highPrice exist, calculate the average price
      if (ride.lowPrice !== undefined && ride.highPrice !== undefined) {
        price = (ride.lowPrice + ride.highPrice) / 2;
      }

      // Check for missing or malformed data
      if (!ride.provider || !ride.duration || !ride.carType) {
        throw new HttpException('Invalid data format', HttpStatus.BAD_REQUEST);
      }

      return {
        provider: ride.provider,
        price: price,
        duration: ride.duration,
        carType: ride.carType
      };
    });

    return normalizedData;
  }
}


