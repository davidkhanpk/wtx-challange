import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TruckScoreModule } from '../truck-score/truck-score.module';
import { TruckFactorController } from './truck-factor.controller';
import { TruckFactor } from './truck-factor.entity';
import { TruckFactorService } from './truck-factor.service';

@Module({
    imports: [TypeOrmModule.forFeature([TruckFactor]), TruckScoreModule],
    controllers: [TruckFactorController],
    providers: [TruckFactorService],
    exports: [TruckFactorService]
})
export class TruckFactorModule { }