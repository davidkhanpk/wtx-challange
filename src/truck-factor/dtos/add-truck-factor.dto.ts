import { IsOptional, IsString } from 'class-validator';
import { TypeEnum } from '../truck-factor.entity';

export class addTruckFactorDto {
    @IsString()
    type: TypeEnum;

    @IsString()
    value: string;

    @IsString()
    @IsOptional()
    score?: string;
}