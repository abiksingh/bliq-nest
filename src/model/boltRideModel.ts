import { IsDate, IsEnum, IsInt, IsString } from 'class-validator';

export class BoltRideModel {
  constructor(props: BoltRideModel) {
    this.id = props.id;
    this.price = props.price;
    this.rideLength = props.rideLength;
    this.vehicleType = props.vehicleType;
  }

  @IsInt()
  id!: string;

  @IsInt()
  price!: number;

  @IsString()
  rideLength!: string;

  @IsString()
  vehicleType!: string;
}
