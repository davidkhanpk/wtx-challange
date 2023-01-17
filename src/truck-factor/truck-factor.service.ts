import { GenericService } from '../base.service';
import { TruckFactor, TypeEnum } from './truck-factor.entity';
import { Injectable, NotFoundException, UseFilters } from '@nestjs/common';
import { InjectRepository ,} from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { getTruckFactorByFilterDto } from './dtos/get-truck-factor-by-filter.dto';
import { TruckScore } from 'src/truck-score/truck-score.entity';
import { TruckScoreService } from 'src/truck-score/truck-score.service';
import { filter, map, Observable, from, toArray, lastValueFrom } from 'rxjs';
import { Truck } from 'src/truck/truck.entity';

@Injectable()
/**
 * @template T
 * @extends {GenericService<T>}
*/
export class TruckFactorService extends GenericService<TruckFactor> {
  /** @constructor */
  constructor(
    @InjectRepository(TruckFactor)
    /** @readonly */
    /** @private */
    private readonly truckFactorRepository: Repository<TruckFactor>,
    /** @readonly */
    /** @private */
    private readonly truckScoreService: TruckScoreService
  ) {
    super(truckFactorRepository)
  }

  /**
   * Returns the array of filter on the base of params.
   * @remarks
   * This method provide the array of filter from the database with params and values
   * @param x - The first input number
   * @returns The array of truck factor on the base of filter
  */
  findByFilter(params: getTruckFactorByFilterDto): Observable<TruckFactor[]> {
    return from(this.truckFactorRepository.find({
        where: [
            {type: params.type},
            {value: params.value}
        ]
    }))
  }

  /**
   * Returns the truck score on the base of truck factors.
   * @remarks
   * This method is improved version of getScoreByFilter
   * @param x - truckId
   * @param y - filter params: getTruckFactorByFilterDto
   * @returns * Returns the truck score on the base of truck factors.
  */
  async getTruckStoreByFilter(truckId: number, params: getTruckFactorByFilterDto): Promise<TruckScore> {
    let truckScoreObservable = this.truckScoreService.findByTruckId(truckId, {})
    const truckScore = await lastValueFrom(truckScoreObservable) // Observable to Promise
    const truckData = truckScore.truck_id as unknown as Truck; // truck data returned from truckScore
    console.log(truckData)
    const factors = await this.truckFactorRepository.findBy(params);
    factors.forEach((factor) => { // iterate factors to calculate score
      truckScore.score = truckScore.score + this.getScoreByFactor(factor, truckData)
    })
    return truckScore;
  }

  /**
   * Generic helper function on the basis of factor.
   * @remarks
   * This method is improved version of getScoreByFilter
   * @param x - truckFactor
   * @param y - Truck:Truck data from Truck Entity
   * @returns * Score Value on the base of provided factor and truck data
  */
  private getScoreByFactor(factor: TruckFactor, truck: Truck):number { // get score on the basis of factor
    switch(factor.type) {
      case TypeEnum.BRAND:
        return factor.value === truck.truck_brand
        ? 0.5
        : 0

      case TypeEnum.LOCATION:
        return factor.value === truck.location
        ? 0.5
        : 0
      case TypeEnum.PRICE:
        return parseInt(factor.value) > truck.price
        ? 0.5
        : 0
      default:
        return 0
    } 
  }
}