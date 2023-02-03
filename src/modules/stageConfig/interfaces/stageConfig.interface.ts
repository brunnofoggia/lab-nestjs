import { StageEnum } from '@common/types/stage.type';
import { CycleEnum } from '@common/types/cycle.type';
import { StageHandlerEnum } from '@common/types/stageHandler.type';
import { GenericInterface } from '@common/interfaces/generic.interface';
import { TriggerConfigInterface } from './triggerConfig.interface';

export interface StageConfigInterface extends GenericInterface {
    cycleConfigId: number;
    stageUid: StageEnum;
    inputCycleUid?: CycleEnum;
    inputStageUid?: StageEnum;
    order: number;
    handlerPath?: StageHandlerEnum;
    triggerConfig?: TriggerConfigInterface;
    integrationConfig?: JSON;
}
