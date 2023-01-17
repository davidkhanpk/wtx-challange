import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository ,} from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { TruckScore } from '../truck-score/truck-score.entity';
import { BRAND, LOCATION, TruckScoreByIdDto } from './dtos/get-truck-score.dto';
import { Truck } from 'src/truck/truck.entity';
import { GenericService } from '../base.service';
import { from, map, Observable } from 'rxjs';

@Injectable()
export class TruckScoreService extends GenericService<TruckScore> {
  constructor(
    @InjectRepository(TruckScore)
    private truckScoreRepository: Repository<TruckScore>,
  ) {
    super(truckScoreRepository)
  }

  findOneByTruckId(
    id: number,
    options: Omit<FindOneOptions<TruckScore>, 'where'> = {},
  ): Observable<TruckScore> {
    return from(this.truckScoreRepository.findOne({
      where: {
        truck_id: id,
      },
      ...options,
    }))
  }

  findByTruckId(
    id: number,
    { location }: TruckScoreByIdDto,
  ): Observable<TruckScore> {
    const truck = this.findOneByTruckId(id, { relations: ['truck_id'] })

    if (!location) {
      return truck;
    }

    return truck.pipe(map(truck => {
      const { location: truckLocation } = truck.truck_id as unknown as Truck;
      return {
          ...truck,
          score:
            truck.score +
            (location.toLocaleLowerCase() === truckLocation.toLocaleLowerCase()
              ? 0.5
              : 0),
        };
    }))
  }

  async save({ truck_id, score }) {
    const truckScore = await this.findOne({ truck_id });

    if (!truckScore) throw new NotFoundException('Truck score not found');
    await this.update(truckScore, { score });

    return await this.truckScoreRepository.findOneBy({
      truck_id: truckScore.truck_id,
    });
  }
}
