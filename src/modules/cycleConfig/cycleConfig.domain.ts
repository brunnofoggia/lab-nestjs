import { Inject, Injectable } from '@nestjs/common';
import { CycleConfigEntity } from '@database/entities/cycleConfig.entity';

import { DataService } from '@database/data.service';
import { CycleConfigService } from '@database/services/cycleConfig.service';
import { StageConfigService } from '@database/services/stageConfig.service';
import { CacheUtil } from '@common/utils/cache.util';
import { CompanyProvider } from '@common/providers/company.provider';
import { CycleConfigInterface } from './interfaces/cycleConfig.interface';
import _ from 'lodash';

@Injectable()
export class CycleConfigDomain {
    public readonly service = () => this.dataService.get(CycleConfigService);
    public readonly stageService = () => this.dataService.get(StageConfigService);

    constructor(
        @Inject(DataService) protected dataService: DataService,
        @Inject(CacheUtil) public cache: CacheUtil,
    ) {
        this.cache.set(this.constructor.name, 3600);
    }

    // cache
    async findDeep(id: number | string): Promise<CycleConfigInterface> {
        const cacheKey: string = this.cache.generateKey('findDeep', id);
        const callback: any = async () => await this._findDeep(id);

        return this.cache.result(cacheKey, callback);
    }

    async _findDeep(id: number | string): Promise<CycleConfigInterface> {
        const timestamps = ['createdAt', 'updatedAt', 'deletedAt'];
        const result: any = _.omit(await this.service().findById(id), ...timestamps);
        result.stagesConfig = _.map(await this._findStages(id),
            (stage) => _.omit(stage, ...timestamps));

        result.data = {};
        result.data.company = _.omit(await CompanyProvider.findCompany(result.companyUid), ...timestamps);
        result.timezone = result.data.company.timezone;

        return result;
    }

    async _findStages(cycleConfigId) {
        return await this.stageService().find({
            where: {
                cycleConfigId
            }
        });
    }

}
