import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CrudService } from '@common/services/crud.service';
import { CacheUtil } from '@common/utils/cache.util';
import { CycleConfigEntity } from '@database/entities/cycleConfig.entity';
import { StageConfigService } from '@database/services/stageConfig.service';

@Injectable()
export class CycleConfigService extends CrudService<CycleConfigEntity> {
    constructor(
        @InjectRepository(CycleConfigEntity) protected readonly repository,
        private readonly stageService: StageConfigService,
        @Inject(CacheUtil) public cache: CacheUtil
    ) {
        super();
    }

    // async findDeep(id: number | string): Promise<CycleConfigEntity> {
    //     const cacheKey: string = this.cache.generateKey('findDeep', id);
    //     const callback: any = async () => await this._findDeep(id);

    //     return this.cache.result(cacheKey, callback);
    // }

    // async _findDeep(id: number | string): Promise<CycleConfigEntity> {
    //     const result: CycleConfigEntity = await this.findById(id);
    //     result.stagesConfig = await this.stageService.find({
    //         where: {
    //             cycleConfigId: id
    //         }
    //     });

    //     return result;
    // }

}
