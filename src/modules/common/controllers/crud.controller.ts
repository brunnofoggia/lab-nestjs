import { Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { IdInterface } from '@common/interfaces/id.interface';
import { NullResponseInterceptor } from '@modules/common/interceptors/nullresponse.interceptor';
import { ParseIntOrStringPipe } from '@common/pipes/parseIntOrString.pipe';
import _ from 'lodash';

@Controller()
export class CrudController<ResponseInterface, CreateDto, UpdateDto> {
    protected service;
    protected createDto;
    protected updateDto;
    protected validationPipeOptions = {
        transform: true,
        whitelist: true,
    };

    async _validationPipe(item, dto) {
        const validationPipe = new ValidationPipe({
            ...this.validationPipeOptions,
            expectedType: dto
        });
        return await validationPipe.transform(item, dto);
    }

    @Post()
    async create(@Body() item: CreateDto): Promise<IdInterface> {
        const dto: CreateDto = await this._validationPipe(item, this.createDto);
        return await this.service().create(dto);
    }

    @Get('/count')
    async count(): Promise<number> {
        return await this.service().count();
    }

    @Get()
    async find(): Promise<ResponseInterface[]> {
        return await this.service().find();
    }

    @Get(':id')
    @UseInterceptors(new NullResponseInterceptor())
    async findById(@Param('id', ParseIntOrStringPipe) id: number | string): Promise<ResponseInterface> {
        const item = await this.service().findById(id);
        return item;
    }

    @Put(':id')
    async update(@Param('id', ParseIntOrStringPipe) id: number | string, @Body() item: UpdateDto): Promise<IdInterface> {
        item[this.service().getIdAttribute()] = id;
        const dto: UpdateDto = await this._validationPipe(item, this.updateDto || this.createDto);
        return this.service().update(dto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntOrStringPipe) id: number | string): Promise<IdInterface> {
        return this.service().remove(id);
    }
}
