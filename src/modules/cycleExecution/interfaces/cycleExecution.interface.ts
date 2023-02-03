import { GenericInterface } from '@common/interfaces/generic.interface';
import { StageExecutionInterface } from '@modules/stageExecution/interfaces/stageExecution.interface';

export interface CycleExecutionResponseInterface extends GenericInterface {
    cycleConfigId: number;
    date: Date;
    stagesExecution?: Array<StageExecutionInterface>;
}
