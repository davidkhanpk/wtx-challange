import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getTruckFactorByFilterDto } from './dtos/get-truck-factor-by-filter.dto';
import { TruckFactorController } from './truck-factor.controller';
import { TypeEnum } from './truck-factor.entity';
import { TruckFactorService } from './truck-factor.service';

describe("TruckFactorController Unit Tests", () => {
    let truckFactorController: TruckFactorController;
    let truckFactorService: TruckFactorService;

    const paramsMock:getTruckFactorByFilterDto = {
        type: <TypeEnum.BRAND>''
    }
    beforeEach(async () => {
        const ApiServiceProvider = {
            provide: TruckFactorService,
            useFactory: () => ({
                findByFilter: jest.fn(() => []),
            })
        }
        const app: TestingModule = await Test.createTestingModule({
            controllers: [TruckFactorController],
            providers: [
                TruckFactorService,
                ApiServiceProvider

            ]
        }).compile();

        truckFactorController = app.get<TruckFactorController>(TruckFactorController);
        truckFactorService = app.get<TruckFactorService>(TruckFactorService);
    })
    
    it('gfindByFilter method calling', () => {
        truckFactorController.getFactorsByFilter(paramsMock);
        expect(truckFactorService.findByFilter).toHaveBeenCalledWith(paramsMock);
    })
    
});