import { GenericDto } from '@common/dto/generic.dto';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsJSON, IsObject } from 'class-validator';

export class CreateNotificationDto extends GenericDto {
    @IsOptional()
    @IsString()
    readonly companyUid?: string;

    @IsNotEmpty()
    @IsString()
    readonly destination: string;

    @IsNotEmpty()
    @IsObject()
    readonly config: JSON;
}

export class UpdateNotificationDto extends GenericDto {
    @IsOptional()
    @IsString()
    readonly companyUid?: string;

    @IsNotEmpty()
    @IsString()
    readonly destination: string;

    @IsOptional()
    @IsObject()
    readonly config?: JSON;
}
