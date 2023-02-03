import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { GenericEntity } from '@common/entities/generic';

import { CycleConfigEntity } from './cycleConfig.entity';
import { StageExecutionEntity } from './stageExecution.entity';
import { set } from '@config/entities';

@Entity({ name: 'cycle_execution' })
export class CycleExecutionEntity extends GenericEntity {
    @Column({ name: 'cycle_config_id' })
    cycleConfigId: number;

    @ManyToOne(() => CycleConfigEntity, (cycleConfig) => cycleConfig.executions)
    @JoinColumn({ name: 'cycle_config_id' })
    cycleConfig: CycleConfigEntity;

    @Column(set({
        name: 'date',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP(6)'
    }))
    date?: Date;

    @OneToMany(() => StageExecutionEntity, (stageExecution) => stageExecution.cycleExecution)
    stagesExecution: StageExecutionEntity[];

}
