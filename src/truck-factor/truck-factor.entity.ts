import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum TypeEnum {
    LOCATION = 'LOCATION',
    BRAND = 'BRAND',
    PRICE = 'PRICE',
}
@Entity()
export class TruckFactor {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    default: 0,
    type: 'float'
  })
  score: number;

  @Column({type: 'varchar'})
  type: TypeEnum

  @Column({type: 'varchar', unique: true})
  value: string
}