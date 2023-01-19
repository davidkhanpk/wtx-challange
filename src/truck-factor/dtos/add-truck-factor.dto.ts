import { IsOptional, IsString } from 'class-validator';
import { TypeEnum } from '../truck-factor.entity';
import { ApiProperty } from '@nestjs/swagger';
export class addTruckFactorDto {
    @IsString()
    @ApiProperty()
    type: TypeEnum;

    @IsString()
    @ApiProperty()
    value: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    score?: string;
}