import { IsOptional, IsString } from 'class-validator';
import { TypeEnum } from '../truck-factor.entity';

export class getTruckFactorByFilterDto {
    @IsString()
    type: TypeEnum;

    @IsString()
    @IsOptional()
    value?: string;
}