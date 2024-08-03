import { IsDate, IsEnum, IsInt, IsString } from 'class-validator';

export class UberRideModel {
  constructor(props: UberRideModel) {
    this.id = props.id;
    this.lowPrice = props.lowPrice;
    this.highPrice = props.highPrice;
    this.rideLength = props.rideLength;
    this.carType = props.carType;
  }

  @IsInt()
  id!: number;

  @IsInt()
  lowPrice!: number;

  @IsInt()
  highPrice!: number;

  @IsString()
  rideLength!: string;

  @IsString()
  carType!: string;
}
