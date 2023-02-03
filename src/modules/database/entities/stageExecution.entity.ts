import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { GenericEntity } from '@common/entities/generic';

import { CycleExecutionEntity } from './cycleExecution.entity';
import { StageStatusEnum } from '@common/types/stageStatus.type';

import { set } from '@config/entities';
import { StageConfigEntity } from './stageConfig.entity';

@Entity({ name: 'stage_execution' })
export class StageExecutionEntity extends GenericEntity {
    @Column({ name: 'cycle_execution_id' })
    cycleExecutionId: number;

    @Column({ name: 'stage_config_id' })
    stageConfigId: number;

    @Column(set({ name: 'status_uid', type: 'enum', enum: StageStatusEnum, enumName: 'stage_status', default: StageStatusEnum.INITIAL }))
    status: StageStatusEnum;

    @ManyToOne(() => CycleExecutionEntity, (cycleExecution) => cycleExecution.stagesExecution)
    @JoinColumn({ name: 'cycle_execution_id' })
    cycleExecution: CycleExecutionEntity;

    @ManyToOne(() => StageConfigEntity, (stageConfig) => stageConfig.stagesExecution)
    @JoinColumn({ name: 'stage_config_id' })
    stageConfig: StageConfigEntity;
}
