import { Controller, Post, Body, Get, Query, Param} from '@nestjs/common';
import { addTruckFactorDto } from './dtos/add-truck-factor.dto';
import { TruckFactorService } from './truck-factor.service';
import { getTruckFactorByFilterDto } from './dtos/get-truck-factor-by-filter.dto';
import { Observable, from } from 'rxjs';
import { TruckScore } from 'src/truck-score/truck-score.entity';
import { TruckFactor } from './truck-factor.entity';


@Controller('trucks/factor')
export class TruckFactorController {
    constructor(
        private readonly truckFactorService: TruckFactorService,
      ) {}

    @Post()
    addFactor(@Body() addTruckFactorDto: addTruckFactorDto): Observable<TruckFactor[]> { // improvement: return single factor
      return from(this.truckFactorService.create(addTruckFactorDto))
    }

    @Get('')
    getFactors()  {
      return this.truckFactorService.findAll();
    }

    @Get('findByFilter')
    getFactorsByFilter(@Query() queryString: getTruckFactorByFilterDto)  {
      return this.truckFactorService.findByFilter(queryString)
    }

    @Get(':truckId')
    getTruckScoreByFilter(@Param('truckId') truckId: number, @Query() queryString: getTruckFactorByFilterDto): Promise<TruckScore>  {
      return this.truckFactorService.getTruckStoreByFilter(truckId, queryString)
    }

}