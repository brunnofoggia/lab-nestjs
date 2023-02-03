import { Test, TestingModule } from '@nestjs/testing';
import { DataServiceController } from './data.service.test';
import { TestService } from '@common/services/crud.service.test';
import { CacheModule } from '@nestjs/common';
import { DataService } from '@database/data.service';
import { TestDataServiceModule } from '@modules/database/data.service.module.test';

describe('Data Service', () => {
    let spyController: DataServiceController;
    let spyDataService: DataService;
    let spyService: TestService;

    beforeEach(async () => {
        const ServiceProvider = {
            provide: TestService,
            useFactory: () => ({
                count: () => TestService,
            })
        };

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register({
                    isGlobal: true
                }),
                TestDataServiceModule.register({
                    isGlobal: true,
                    providers: [ServiceProvider],
                }),
            ],
            controllers: [DataServiceController],
        }).compile();

        spyController = module.get<DataServiceController>(DataServiceController);
        spyService = spyController.service();
    });

    it('to be defined', () => {
        const result: any = spyService.count();
        expect(spyService).not.toBeFalsy();
        expect(result).toEqual(TestService);
    });
});
