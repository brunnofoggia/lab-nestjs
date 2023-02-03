import { HttpException, HttpStatus } from '@nestjs/common';
import { IsNull } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import _ from 'lodash';
import { IdInterface } from '@common/interfaces/id.interface';

export class CrudService<ENTITY> {
    protected readonly repository;
    protected idAttribute = 'id';
    protected _deleteRecords: false;

    getIdAttribute() {
        return this.idAttribute;
    }

    count(): Promise<number> {
        return this.repository.count();
    }

    private _find(options: any = {}): Promise<ENTITY[]> {
        const order: any = {};
        order[this.idAttribute] = 'ASC';

        options = {
            ...options,
            where: {
                ...options.where,
                deletedAt: IsNull()
            },
            order: options.order || order
        };

        return this.repository.find(options);
    }

    find(options = {}): Promise<ENTITY[]> {
        return this._find(options);
    }

    findAll(options = {}): Promise<ENTITY[]> {
        return this._find(options);
    }

    private async _findById(id: number | string, options: any = {}): Promise<ENTITY> {
        const where: any = { ...options.where };
        where[this.idAttribute] = id;

        return (await this.find({
            ...options,
            where,
            take: 1,
        })).shift() || null;
    }

    async findById(id: number | string, options: any = {}): Promise<ENTITY> {
        return await this._findById(id, options);
    }

    async checkIdTaken(id: number | string): Promise<boolean> {
        const item = await this._findById(id);
        if (!item)
            throw new HttpException('', HttpStatus.NOT_FOUND);
        return true;
    }

    async checkIdNotTaken(id: number | string): Promise<boolean> {
        const item = await this._findById(id);
        if (item)
            throw new HttpException('', HttpStatus.FOUND);
        return true;
    }

    private async _create(_item: QueryDeepPartialEntity<ENTITY>): Promise<IdInterface> {
        _item[this.idAttribute] && (await this.checkIdNotTaken(_.result(_item, this.idAttribute)));
        await this.repository.save(_item);
        return { id: _.result(_item, this.idAttribute) };
    }

    async create(_item: QueryDeepPartialEntity<ENTITY>): Promise<IdInterface> {
        return await this._create(_item);
    }

    private async _update(_item: QueryDeepPartialEntity<ENTITY>): Promise<IdInterface> {
        await this.checkIdTaken(_.result(_item, this.idAttribute));
        await this.repository.save(_item);
        return { id: _.result(_item, this.idAttribute) };
    }

    async update(_item: QueryDeepPartialEntity<ENTITY>): Promise<IdInterface> {
        return await this._update(_item);
    }

    private async _hide(id: number | string): Promise<IdInterface> {
        await this.checkIdTaken(id);

        const item: any = { deletedAt: new Date().toISOString() };
        item[this.idAttribute] = id;

        await this.repository.save(item);
        return { id };
    }

    async hide(id: number | string): Promise<IdInterface> {
        return await this._hide(id);
    }

    private async _delete(id: number | string): Promise<IdInterface> {
        await this.checkIdTaken(id);
        await this.repository.delete(id);
        return { id };
    }

    async delete(id: number | string): Promise<IdInterface> {
        return await this._delete(id);
    }

    private async _remove(id: number | string): Promise<IdInterface> {
        return this.deleteRecords() ? this.delete(id) : this.hide(id);
    }

    async remove(id: number | string): Promise<IdInterface> {
        return await this._remove(id);
    }

    deleteRecords() {
        return this._deleteRecords;
    }
}
