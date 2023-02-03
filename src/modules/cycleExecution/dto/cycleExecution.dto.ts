import { IsNotEmpty, IsString, IsEmail, IsNumber, IsDate, IsOptional } from 'class-validator';
import { CycleHandlerEnum } from '@modules/common/types/cycleHandler.type';
import { GenericDto } from '@common/dto/generic.dto';
import { Transform } from 'class-transformer';

export class CycleExecutionDto extends GenericDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    readonly cycleConfigId: number;

    @IsOptional()
    @IsDate()
    @Transform(({ value }) => new Date(value))
    readonly date?: Date;
}
