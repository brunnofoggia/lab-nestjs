import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { GenericEntity } from '@common/entities/generic';
import { set } from '@config/entities';

import { CycleExecutionEntity } from './cycleExecution.entity';
import { StageConfigEntity } from './stageConfig.entity';

import { CycleEnum } from '@common/types/cycle.type';
import { CycleHandlerEnum } from '@common/types/cycleHandler.type';

@Entity({ name: 'cycle_config' })
export class CycleConfigEntity extends GenericEntity {
    @Column({ name: 'company_uid' })
    companyUid: string;

    @Column(set({ name: 'cycle_uid', type: 'enum', enum: CycleEnum, enumName: 'cycle' }))
    cycleUid: CycleEnum;

    @Column(set({ name: 'handler_path', type: 'enum', enum: CycleHandlerEnum, enumName: 'cycle_handler', default: null }))
    handlerPath?: CycleHandlerEnum;

    @OneToMany(() => CycleExecutionEntity, (cycle) => cycle.cycleConfig)
    executions: CycleExecutionEntity[];

    @OneToMany(() => StageConfigEntity, (stage) => stage.cycleConfig)
    stagesConfig: StageConfigEntity[];
}
