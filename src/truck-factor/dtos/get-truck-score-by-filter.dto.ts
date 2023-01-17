import { IsOptional, IsString } from 'class-validator';
import { TypeEnum } from '../truck-factor.entity';

export class getTruckScoreByFilter {
    @IsString()
    type: TypeEnum;

    @IsString()
    @IsOptional()
    value?: string;
}