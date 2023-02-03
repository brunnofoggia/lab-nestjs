import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { DB_ERRORS_KEYS } from '@database/errors';
import { DatabaseConfigModule } from '@database/config';
import { create, idResponse, item } from '@test/mocks/crud.service.mock';
import { CacheModule } from '@nestjs/common';
import { GenericEntity } from '@common/entities/generic';
import { GenericDto } from '@common/dto/generic.dto';
import { TestService } from './crud.service.test';

describe('Crud Service', () => {
    let service: TestService;
    let repository: any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                DatabaseConfigModule,
                TypeOrmModule.forFeature([GenericEntity]),
                CacheModule.register({
                    isGlobal: true
                }),],
            providers: [
                TestService
            ],
        }).compile();

        service = module.get<TestService>(TestService);
        repository = module.get(getRepositoryToken(GenericEntity));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('count', () => {
        it('should return total of companies', async () => {
            const count = 2;
            jest.spyOn(repository, 'count').mockResolvedValueOnce(count);
            expect(await service.count()).toEqual(count);
        });
    });

    describe('findById', () => {
        it('should return an company', async () => {
            jest.spyOn(repository, 'find').mockResolvedValueOnce([item]);
            expect(await service.findById(idResponse.id)).toEqual(item);
        });
    });

    describe('find (find all)', () => {
        it('should return a list of companies', async () => {
            const result = [item];
            jest.spyOn(repository, 'find').mockResolvedValueOnce(result);
            expect(await service.findAll()).toEqual(result);
        });
        it('should return an empty array', async () => {
            const result = [];
            jest.spyOn(repository, 'find').mockResolvedValueOnce(result);
            expect(await service.findAll()).toEqual(result);
        });
    });

    describe('create', () => {
        it('should return the id', async () => {
            jest.spyOn(repository, 'find').mockResolvedValueOnce([]);
            jest.spyOn(repository, "save").mockImplementation((entity) => {
                entity['id'] = idResponse.id;
            });
            const result = await service.create(create as GenericDto);
            expect(result).toEqual(idResponse);
        });
        it('should throw an exception', async () => {
            const errorKey = 'UNIQUE_FIELD';
            const errorCode = DB_ERRORS_KEYS[errorKey];
            const result = { code: errorCode };

            jest.spyOn(repository, 'find').mockResolvedValueOnce([]);
            jest.spyOn(repository, 'save').mockImplementation(() => {
                throw { code: errorCode };
            });

            try {
                await service.create(create as GenericDto);
            } catch (err) {
                expect(err.code).toEqual(result.code);
            }
        });
    });

    describe('delete', () => {
        it('should return the id', async () => {
            jest.spyOn(repository, 'find').mockResolvedValueOnce([item]);
            jest.spyOn(repository, 'delete').mockResolvedValueOnce(idResponse);
            const result = await service.delete(idResponse.id);

            expect(result).toEqual(idResponse);
        });
        it('should throw an exception', async () => {
            const errorKey = 'UNIQUE_FIELD';
            const errorCode = DB_ERRORS_KEYS[errorKey];
            const result = { code: errorCode };

            jest.spyOn(repository, 'find').mockResolvedValueOnce([item]);
            jest.spyOn(repository, 'delete').mockImplementation(() => {
                throw { code: errorCode };
            });

            try {
                await service.delete(idResponse.id);
            } catch (err) {
                expect(err.code).toEqual(result.code);
            }
        });
    });

    describe('hide', () => {
        it('should return the id', async () => {
            jest.spyOn(repository, 'find').mockResolvedValueOnce([item]);
            jest.spyOn(repository, 'save').mockResolvedValueOnce(idResponse);
            const result = await service.hide(idResponse.id);

            expect(result).toEqual(idResponse);
        });
    });

});
