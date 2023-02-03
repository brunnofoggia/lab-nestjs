import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { GenericDto } from '@common/dto/generic.dto';
import { Transform } from 'class-transformer';

export class StageExecutionDto extends GenericDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    readonly cycleExecutionId: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    readonly stageConfigId: number;

    @IsOptional()
    @IsString()
    readonly status?: string;
}
