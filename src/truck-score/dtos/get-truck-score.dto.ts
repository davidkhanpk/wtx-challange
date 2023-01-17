import { IsOptional, IsString } from 'class-validator';

export type BRAND = string;
export type LOCATION = string;

export class TruckScoreByIdDto {
  @IsString()
  @IsOptional()
  location?: LOCATION;

  @IsString()
  @IsOptional()
  brand?: BRAND;
}
