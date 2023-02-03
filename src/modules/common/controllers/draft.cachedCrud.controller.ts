import { Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, HttpException, HttpStatus, Req } from '@nestjs/common';
import { IdInterface } from '@common/interfaces/id.interface';
import { NullResponseInterceptor } from '@modules/common/interceptors/nullresponse.interceptor';
import { ParseIntOrStringPipe } from '@common/pipes/parseIntOrString.pipe';
import _, { method } from 'lodash';
import { plainToInstance } from 'class-transformer';
import { CrudController } from './crud.controller';
import CryptoJS from 'crypto-js';

@Controller()
export class CachedCrudController<ResponseInterface, Dto> extends CrudController<ResponseInterface, Dto> {
    protected cacheManager;
    protected cacheTTL;

    @Post()
    async create(@Body() dto: Dto): Promise<IdInterface> {
        this.cacheManager.del(this.generateCacheKey('cachedFind'));
        return await this.service().create(plainToInstance(this.createDto, dto));
    }

    @Get('/count')
    async count(): Promise<number> {
        return await this.service().count();
    }

    @Get()
    async cachedFind(@Req() req): Promise<ResponseInterface[]> {
        const cacheKey: string = this.generateCacheKey('cachedFind');
        const cache: string = await this.cacheManager.get(cacheKey);

        let result: ResponseInterface[] = null;
        try {
            result = JSON.parse(cache);
        } catch (err) {
            result = await super.find();
            await this.cacheManager.set(cacheKey, JSON.stringify(result), { ttl: this.cacheTTL });
        }

        return result;
    }

    @Get(':id')
    @UseInterceptors(new NullResponseInterceptor())
    async cachedFindById(@Req() req, @Param('id', ParseIntOrStringPipe) id: number | string): Promise<ResponseInterface> {
        const cacheKey: string = this.generateCacheKey('cachedFindById', id);
        const cache: string = await this.cacheManager.get(cacheKey);

        let result: ResponseInterface = null;
        try {
            result = JSON.parse(cache);
        } catch (err) {
            result = await this.service().findById(id);
            await this.cacheManager.set(cacheKey, JSON.stringify(result), { ttl: this.cacheTTL });
        }

        return result;
    }

    @Put(':id')
    async cachedUpdate(@Req() req, @Param('id', ParseIntOrStringPipe) id: number | string, @Body() dto: Dto): Promise<IdInterface> {
        this.cacheManager.del(this.generateCacheKey('cachedFindById', id));
        this.cacheManager.del(this.generateCacheKey('cachedFind'));

        dto['id'] = id;
        const result: IdInterface = this.service().update(plainToInstance(this.createDto, dto));

        return result;
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntOrStringPipe) id: number | string): Promise<IdInterface> {
        this.cacheManager.del(this.generateCacheKey('cachedFindById', id));
        this.cacheManager.del(this.generateCacheKey('cachedFind'));

        return this.service().remove(id);
    }

    generateCacheKey(methodName: string, id: number | string = ''): string {
        const cacheKey: string[] = [this.constructor.name, methodName, id + ''];
        return cacheKey.join('#');
    }
}
