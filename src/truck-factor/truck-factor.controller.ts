import { Controller, Post, Body, Get, Query, Param} from '@nestjs/common';
import { addTruckFactorDto } from './dtos/add-truck-factor.dto';
import { TruckFactorService } from './truck-factor.service';
import { getTruckFactorByFilterDto } from './dtos/get-truck-factor-by-filter.dto';
import { Observable, from } from 'rxjs';
import { TruckScore } from 'src/truck-score/truck-score.entity';
import { TruckFactor } from './truck-factor.entity';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('TruckFactor')
@Controller('trucks/factor')
export class TruckFactorController {
    constructor(
        private readonly truckFactorService: TruckFactorService,
      ) {}

    @ApiOperation({ summary: 'Add Truck factor' })
    @ApiResponse({
      status: 200,
      description: 'The found record',
      type: TruckFactor,
    })
    @Post()
    addFactor(@Body() addTruckFactorDto: addTruckFactorDto): Observable<TruckFactor[]> { // improvement: return single factor
      return from(this.truckFactorService.create(addTruckFactorDto))
    }

    @ApiOperation({ summary: 'Get all truck factor' })
    @ApiResponse({
      status: 200,
      description: 'Get all truck factor list',
      type: [TruckFactor],
    })
    @Get('')
    getFactors()  {
      return this.truckFactorService.findAll();
    }

    @ApiOperation({ summary: 'Get all truck factor by type' })
    @ApiResponse({
      status: 200,
      description: 'Get truck factor list by type',
      type: [TruckFactor],
    })
    @Get('findByFilter')
    getFactorsByFilter(@Query() queryString: getTruckFactorByFilterDto)  {
      return this.truckFactorService.findByFilter(queryString)
    }

    @ApiOperation({ summary: 'Get truck score by factor type' })
    @ApiResponse({
      status: 200,
      description: 'Get truck score by factor type',
      type: [TruckScore],
    })
    @Get(':truckId')
    getTruckScoreByFilter(@Param('truckId') truckId: number, @Query() queryString: getTruckFactorByFilterDto): Promise<TruckScore>  {
      return this.truckFactorService.getTruckStoreByFilter(truckId, queryString)
    }

}