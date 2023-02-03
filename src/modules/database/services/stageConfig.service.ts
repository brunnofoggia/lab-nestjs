import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StageConfigEntity } from '@modules/database/entities/stageConfig.entity';
import { CrudService } from '@common/services/crud.service';
import { StageTriggerEnum } from '@common/types/stageTrigger.type';

@Injectable()
export class StageConfigService extends CrudService<StageConfigEntity> {
    constructor(@InjectRepository(StageConfigEntity) protected readonly repository) {
        super();
    }

    findSchedule(options: any = {}): Promise<StageConfigEntity[]> {
        return this.find({
            ...options,
            where: {
                ...options.where,
                triggerUid: StageTriggerEnum.SCHEDULE
            }
        });
    }

    async findScheduleByConfig(triggerConfig: any = {}): Promise<StageConfigEntity[]> {
        const queryBuilder = this.repository
            .createQueryBuilder("stageConfig")
            .innerJoinAndSelect(
                "stageConfig.cycleConfig",
                "cycleConfig"
            );

        queryBuilder.where("trigger_uid = :triggerUid", { triggerUid: StageTriggerEnum.SCHEDULE });

        for (const [key, value] of Object.entries(triggerConfig)) {
            const data: any = {};
            data[key] = {}; // *dynamic parameter name* with the trigger config json
            data[key][key] = value; // key and value to filter

            queryBuilder.andWhere(`trigger_config ::jsonb @> :${key}`, data);
        }

        return await queryBuilder.getMany();
    }
}
