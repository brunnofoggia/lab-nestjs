import { Controller, Get, Inject, Param } from '@nestjs/common';
import { CreateNotificationDto, UpdateNotificationDto } from './dto/notification.dto';
import { NotificationInterface } from './interfaces/notification.interface';
import { NotificationDomain } from './notification.domain';
import { throwHttpException } from '@modules/common/errors.function';

@Controller('notification')
export class NotificationController {
    @Inject(NotificationDomain) protected domain: NotificationDomain;
    protected createDto = CreateNotificationDto;
    protected updateDto = UpdateNotificationDto;

    @Get(':cycleId')
    async find(@Param('cycleId') cycleId: number): Promise<NotificationInterface[]> {
        return await this.domain.find(cycleId);
    }
}
