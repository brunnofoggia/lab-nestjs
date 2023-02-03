import { IsNotEmpty, IsString, IsEmail, IsNumber, IsOptional } from 'class-validator';
import { CycleHandlerEnum } from '@modules/common/types/cycleHandler.type';
import { GenericDto } from '@common/dto/generic.dto';

export class CreateCycleConfigDto extends GenericDto {
    @IsNotEmpty()
    @IsString()
    readonly companyUid: string;

    @IsNotEmpty()
    @IsString()
    readonly cycleUid: string;

    @IsNotEmpty()
    @IsString()
    readonly handlerPath: CycleHandlerEnum;
}

export class UpdateCycleConfigDto extends GenericDto {
    @IsOptional()
    @IsString()
    readonly companyUid?: string;

    @IsOptional()
    @IsString()
    readonly cycleUid?: string;

    @IsOptional()
    @IsString()
    readonly handlerPath?: CycleHandlerEnum;
}
