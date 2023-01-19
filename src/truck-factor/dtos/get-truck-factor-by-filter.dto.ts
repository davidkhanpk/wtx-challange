import { IsOptional, IsString } from 'class-validator';
import { TypeEnum } from '../truck-factor.entity';
import { ApiProperty } from '@nestjs/swagger';

export class getTruckFactorByFilterDto {
    @ApiProperty()
    @IsString()
    type: TypeEnum;

    @ApiProperty()
    @IsString()
    @IsOptional()
    value?: string;
}