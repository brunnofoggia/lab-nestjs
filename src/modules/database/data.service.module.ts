import { CacheModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataService } from '@database/data.service';

import { CycleExecutionService } from '@modules/database/services/cycleExecution.service';
import { CycleConfigService } from '@database/services/cycleConfig.service';
import { StageExecutionService } from '@modules/database/services/stageExecution.service';
import { StageConfigService } from '@modules/database/services/stageConfig.service';

import { CycleExecutionEntity } from '@modules/database/entities/cycleExecution.entity';
import { CycleConfigEntity } from '@database/entities/cycleConfig.entity';
import { StageExecutionEntity } from '@modules/database/entities/stageExecution.entity';
import { StageConfigEntity } from '@modules/database/entities/stageConfig.entity';
import { CacheUtil } from '@common/utils/cache.util';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
            CycleExecutionEntity,
            CycleConfigEntity,
            StageExecutionEntity,
            StageConfigEntity,
        ]),
    ],
    providers: [
        CycleExecutionService,
        CycleConfigService,
        StageExecutionService,
        StageConfigService,
        DataService,
        CacheUtil,
    ],
    exports: [
        DataService,
        CacheUtil,
    ]
})
export class DataServiceModule { }
