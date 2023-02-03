import { IsNotEmpty, IsString, IsNumber, IsOptional, IsObject } from 'class-validator';
import { Transform } from 'class-transformer';
import { GenericDto } from '@common/dto/generic.dto';

export class TriggerConfigDto extends GenericDto {
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    readonly hour?: number;
}
