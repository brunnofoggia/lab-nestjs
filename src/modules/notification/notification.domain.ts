import { Inject, Injectable } from '@nestjs/common';

import { CacheUtil } from '@common/utils/cache.util';
import _ from 'lodash';
import { NotificationInterface } from './interfaces/notification.interface';
import { DataService } from '@database/data.service';
import { CycleExecutionService } from '@database/services/cycleExecution.service';
import { NotificationProvider } from '@common/providers/notification.provider';
import { throwHttpException } from '@modules/common/errors.function';

@Injectable()
export class NotificationDomain {
    public readonly cycleExecutionService = () => this.dataService.get(CycleExecutionService);

    constructor(
        @Inject(DataService) protected dataService: DataService,
        @Inject(CacheUtil) public cache: CacheUtil,
    ) {
        this.cache.set(this.constructor.name, 3600);
    }

    async _find(cycleId: number): Promise<NotificationInterface[]> {
        const cycleExecution = await this.cycleExecutionService().findById(cycleId, { relations: { cycleConfig: true } });

        const globalDestinations = await NotificationProvider.findGlobal();
        const companyDestinations = await NotificationProvider.findByCompanyUid(cycleExecution.cycleConfig.companyUid);

        return [...globalDestinations, ...companyDestinations];
    }

    // cache
    async find(cycleId: number): Promise<NotificationInterface[]> {
        const cacheKey: string = this.cache.generateKey('find', cycleId);
        const callback: any = async () => await this._find(cycleId);

        return this.cache.result(cacheKey, callback);
    }

}
