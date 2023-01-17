import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Truck } from './truck.entity';
import { UpdatePriceDto } from './dtos/update-price-dto';
import { GenericService } from '../base.service';

@Injectable()
export class TruckService extends GenericService<Truck> {
  constructor(
    @InjectRepository(Truck)
    private truckRepository: Repository<Truck>,
  ) {
    super(truckRepository)
  }

  // findAll(): Promise<Truck[]> {
  //   return this.truckRepository.find();
  // }

  // count(): Promise<number> {
  //   return this.truckRepository.count();
  // }

  // findOne(id: number): Promise<Truck> {
  //   return this.truckRepository.findOneBy({ id });
  // }

  updatePrice(
    id: number,
    updatePriceDto: UpdatePriceDto,
  ): Promise<UpdateResult> {
    return this.truckRepository.update(id, {
      price: updatePriceDto.price,
    });
  }
}
