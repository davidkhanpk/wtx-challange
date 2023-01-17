import { Observable, from } from 'rxjs';
import {  FindOptionsWhere, Repository, UpdateResult } from 'typeorm';

/**
   * Generic base class for extend serive module.
   * @remarks
   * This class provide the generic implementation of repositors actions
  */
export abstract class GenericService<T> {
    
   constructor(private readonly repository: Repository<T>) {}
    
    public async count(): Promise<number> {
        return await this.repository.count()
    }
    public findAll(): Observable<T[]> {
        return from(this.repository.find());
    }
    public async findOne(options: any): Promise<T> {
        return this.repository.findOneBy( options );
    }
    public create(records: any): Observable<T[]> {
        let record = this.repository.create(records)
        return from(this.repository.save(record));
    }
    public async update(criteria: FindOptionsWhere<T>, partialEntity): Promise<UpdateResult> {
        return this.repository.update(criteria, partialEntity)
    }

    public async find(params:any):Promise<T[]> {
        console.log("eee")
        console.log(this.repository.findBy(params))
        return await this.repository.findBy(params);
    }
    
}