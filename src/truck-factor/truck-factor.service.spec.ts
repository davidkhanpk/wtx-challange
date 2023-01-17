import { Test, TestingModule } from '@nestjs/testing';
import { getTruckFactorByFilterDto } from './dtos/get-truck-factor-by-filter.dto';
import { TypeEnum } from './truck-factor.entity';
import { TruckFactorService } from "./truck-factor.service";

class FactorServiceMock {
    findByFilter = (params: getTruckFactorByFilterDto) => Promise.resolve([]);
}

describe('TruckFactorService', () => {
    let truckFactorService: TruckFactorService;
    
    const paramsMock:getTruckFactorByFilterDto = {
        type: <TypeEnum.BRAND>''
    }

    beforeEach(async () => {
      const ApiServiceProvider = {
        provide: TruckFactorService,
        useClass: FactorServiceMock,
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [TruckFactorService, ApiServiceProvider],
      }).compile();
      truckFactorService = module.get<TruckFactorService>(TruckFactorService);
    });

    it('should call findOne method ', async () => {
        const findByFilter = jest.spyOn(truckFactorService, 'findByFilter');
        truckFactorService.findByFilter(paramsMock);
        expect(findByFilter).toHaveBeenCalledWith(paramsMock);
      });

})