import { IsEnum, IsInt, IsObject, IsString } from 'class-validator';
import { Duration, RideEntity, RideProvider } from '../constants';

export class RideModel implements RideEntity {
  constructor(props: RideModel) {
    this.id = props.id;
    this.provider = props.provider;
    this.price = props.price;
    this.duration = props.duration;
    this.carType = props.carType;
  }

  @IsInt()
  id!: string;

  @IsEnum(RideProvider)
  provider!: RideProvider;

  @IsInt()
  price!: number;

  @IsObject()
  duration!: Duration;

  @IsString()
  carType!: string;
}
