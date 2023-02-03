import { Inject, Injectable } from '@nestjs/common';
import _ from 'lodash';

import { DataService } from '@database/data.service';
import { CacheUtil } from '@common/utils/cache.util';

import { CycleExecutionEntity } from '@database/entities/cycleExecution.entity';
import { CycleExecutionService } from '@database/services/cycleExecution.service';
import { StageExecutionService } from '@database/services/stageExecution.service';
import { CycleExecutionResponseInterface } from './interfaces/cycleExecution.interface';

@Injectable()
export class CycleExecutionDomain {
    public readonly service = () => this.dataService.get(CycleExecutionService);
    public readonly stageService = () => this.dataService.get(StageExecutionService);

    constructor(
        @Inject(DataService) protected dataService: DataService,
        @Inject(CacheUtil) public cache: CacheUtil,
    ) {
        this.cache.set(this.constructor.name, 3600);
    }

    async findDeep(id: number | string): Promise<CycleExecutionResponseInterface> {
        const timestamps = ['createdAt', 'updatedAt', 'deletedAt'];
        const result: any = _.omit(await this.service().findById(id), ...timestamps);
        result.stagesExecution = _.map(await this.findStages(id),
            (stageExecution) => _.omit(stageExecution, ...timestamps));

        return result;
    }

    async findStages(cycleExecutionId) {
        return await this.stageService().find({
            where: {
                cycleExecutionId
            }
        });
    }

}
