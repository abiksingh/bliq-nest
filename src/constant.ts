export enum RideProvider {
  BOLT = 'Bolt',
  UBER = 'Uber',
}

export enum CarType {
  SEDAN = 'Sedan',
  SUV = 'SUV',
  HATCHBACK = 'Hatchback',
  LUXURY = 'Luxury',
  MINIVAN = 'Minivan',
  MOTORCYCLE = 'Motorcycle',
  SCOOTER = 'Scooter',
  TRUCK = 'Truck',
  VAN = 'Van',
  WAGON = 'Wagon',
  OTHER = 'Other',
}

export interface Duration {
  value: number;
  unit: string;
}

export interface RideEntity {
  provider: RideProvider;
  price: number;
  duration: Duration;
  carType: string;
}
