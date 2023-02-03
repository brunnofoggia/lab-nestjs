import { Test, TestingModule } from '@nestjs/testing';
import { TestController, ForbidNonWhitelistedController } from './crud.controller.test';
import { TestService } from '@common/services/crud.service.test';
import { CacheModule } from '@nestjs/common';
import { DataService } from '@database/data.service';
import { TestDataServiceModule } from '@modules/database/data.service.module.test';
import { GenericDto } from '@common/dto/generic.dto';

describe('Crud Controller', () => {
    let spyController: TestController;
    let spyDataService: DataService;
    let spyService: TestService;
    let module: TestingModule;

    beforeEach(async () => {
        const ServiceProvider = {
            provide: TestService,
            useFactory: () => ({
                getIdAttribute: jest.fn(),
                count: jest.fn(),
                find: jest.fn(),
                findById: jest.fn(),
                findAll: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
                remove: jest.fn()
            })
        };

        module = await Test.createTestingModule({
            imports: [
                CacheModule.register({
                    isGlobal: true
                }),
            ],
            controllers: [TestController, ForbidNonWhitelistedController],
            providers: [ServiceProvider]
        }).compile();

        spyController = module.get<TestController>(TestController);
        spyService = module.get<TestService>(TestService);
    });

    describe('create', () => {
        it('calling create method', async () => {
            const dto = new GenericDto();
            expect(await spyController.create(dto)).not.toEqual(null);
            expect(spyService.create).toHaveBeenCalled();
            expect(spyService.create).toHaveBeenCalledWith(dto);
        });
    });

    describe('count', () => {
        it('calling count method', async () => {
            await spyController.count();
            expect(spyService.count).toHaveBeenCalled();
        });
    });

    describe('find', () => {
        it('calling find method', async () => {
            await spyController.find();
            expect(spyService.find).toHaveBeenCalled();
        });
    });

    describe('findById', () => {
        it('found', async () => {
            const create = { id: 1 };
            jest.spyOn(spyService, 'findById').mockResolvedValueOnce(create);
            expect(await spyController.findById(1)).toMatchObject(create);
            expect(spyService.findById).toHaveBeenCalled();
        });

        it('not found', async () => {
            jest.spyOn(spyService, 'findById').mockResolvedValueOnce(null);
            try {
                await spyController.findById(1);
            } catch (err) {
                expect(err.status).toBe(404);
            }
            expect(spyService.findById).toHaveBeenCalled();
        });
    });

    describe('update', () => {
        it('calling update method', async () => {
            jest.spyOn(spyService, 'getIdAttribute').mockReturnValue('id');
            const dto = new GenericDto();
            const id = 1;
            await spyController.update(id, dto);
            expect(spyService.update).toHaveBeenCalled();
            expect(spyService.update).toHaveBeenCalledWith(dto);
        });
    });

    describe('remove', () => {
        it('calling remove method', async () => {
            const id = 1;
            await spyController.remove(id);
            expect(spyService.remove).toHaveBeenCalled();
        });
    });

    describe('whitelist', () => {
        it('should transform and/or exclude properties', async () => {
            const create = { id: 1 };
            const dto: any = { id: '1' };
            dto.admin = true;

            expect(await spyController.create(dto)).not.toEqual(null);
            expect(spyService.create).toHaveBeenCalled();
            expect(spyService.create).toHaveBeenCalledWith(create);
        });
    });

    describe('forbid non whitelisted', () => {
        it('should throw error', async () => {
            const spyController = module.get<ForbidNonWhitelistedController>(ForbidNonWhitelistedController);
            const create: any = { id: 1 };
            create.admin = true;

            try {
                await spyController.create(create);
            } catch (err) {
                expect(() => { throw err; }).toThrowError();
            }
        });
    });
});
