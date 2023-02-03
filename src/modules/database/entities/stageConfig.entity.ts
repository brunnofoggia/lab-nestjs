import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { GenericEntity } from '@common/entities/generic';

import { StageHandlerEnum } from '@common/types/stageHandler.type';
import { CycleConfigEntity } from './cycleConfig.entity';
import { StageEnum } from '@common/types/stage.type';

import { set } from '@config/entities';
import { StageExecutionEntity } from './stageExecution.entity';
import { CycleEnum } from '@common/types/cycle.type';
import { StageTriggerEnum } from '@common/types/stageTrigger.type';
import { TriggerConfigDto } from '@modules/stageConfig/dto/triggerConfig.dto';

@Entity({ name: 'stage_config' })
export class StageConfigEntity extends GenericEntity {
    @Column({ name: 'cycle_config_id' })
    cycleConfigId: number;

    @Column(set({ name: 'stage_uid', type: 'enum', enum: StageEnum, enumName: 'stage' }))
    stageUid: StageEnum;

    @Column(set({ name: 'input_cycle_uid', type: 'enum', enum: CycleEnum, enumName: 'cycle2', default: null }))
    inputCycleUid?: CycleEnum;

    @Column(set({ name: 'input_stage_uid', type: 'enum', enum: StageEnum, enumName: 'stage2', default: null }))
    inputStageUid?: StageEnum;

    @Column(set({ name: 'trigger_uid', type: 'enum', enum: StageTriggerEnum, enumName: 'stageTrigger', default: StageTriggerEnum.AUTO }))
    triggerUid: StageTriggerEnum;

    @Column(set({ name: 'trigger_config', type: 'jsonb', default: {} }))
    triggerConfig?: TriggerConfigDto;

    @Column(set({ name: 'integration_config', type: 'jsonb', default: {} }))
    integrationConfig?: JSON;

    @Column({ type: "int2", default: 0 })
    order: number;

    @Column(set({ name: 'handler_path', type: 'enum', enum: StageHandlerEnum, enumName: 'stage_handler', default: null }))
    handlerPath?: StageHandlerEnum;

    @ManyToOne(() => CycleConfigEntity, (cycleConfig) => cycleConfig.stagesConfig)
    @JoinColumn({ name: 'cycle_config_id' })
    cycleConfig: CycleConfigEntity;

    @OneToMany(() => StageExecutionEntity, (stage) => stage.stageConfig)
    stagesExecution: StageExecutionEntity[];
}
