import { StageStatusEnum } from '@common/types/stageStatus.type';
import { GenericInterface } from '@common/interfaces/generic.interface';

export interface StageExecutionInterface extends GenericInterface {
    cycleExecutionId: number;
    stageConfigId: number;
    status: StageStatusEnum;
}
