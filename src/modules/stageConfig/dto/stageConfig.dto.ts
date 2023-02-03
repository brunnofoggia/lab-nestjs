import { IsNotEmpty, IsString, IsNumber, IsOptional, IsObject } from 'class-validator';
import { Transform } from 'class-transformer';
import { CycleHandlerEnum } from '@common/types/cycleHandler.type';
import { StageEnum } from '@common/types/stage.type';
import { GenericDto } from '@common/dto/generic.dto';
import { CycleEnum } from '@common/types/cycle.type';
import { StageTriggerEnum } from '@common/types/stageTrigger.type';
import { TriggerConfigDto } from './triggerConfig.dto';

export class StageConfigDto extends GenericDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    readonly cycleConfigId: number;

    @IsNotEmpty()
    @IsString()
    readonly handlerPath: CycleHandlerEnum;

    @IsNotEmpty()
    @IsString()
    readonly stageUid: StageEnum;

    @IsOptional()
    @IsString()
    readonly inputCycleUid?: CycleEnum;

    @IsOptional()
    @IsString()
    readonly inputStageUid?: StageEnum;

    @IsOptional()
    @IsString()
    readonly triggerUid?: StageTriggerEnum;

    @IsOptional()
    @IsObject()
    readonly triggerConfig?: TriggerConfigDto;

    @IsOptional()
    @IsObject()
    readonly integrationConfig?: JSON;

    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    readonly order: number;
}
