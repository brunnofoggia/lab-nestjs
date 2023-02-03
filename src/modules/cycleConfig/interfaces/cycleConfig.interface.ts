import { CycleEnum } from '@common/types/cycle.type';
import { CycleHandlerEnum } from '@common/types/cycleHandler.type';
import { StageConfigInterface } from '@modules/stageConfig/interfaces/stageConfig.interface';
import { GenericInterface } from '@common/interfaces/generic.interface';

export interface CycleConfigInterface extends GenericInterface {
    companyUid: string;
    cycleUid: CycleEnum;
    handlerPath?: CycleHandlerEnum;
    stagesConfig?: Array<StageConfigInterface>;
    data?: JSON;
    timezone?: string;
}
