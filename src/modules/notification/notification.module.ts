import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationDomain } from './notification.domain';

@Module({
    imports: [],
    controllers: [NotificationController],
    providers: [NotificationDomain]
})
export class NotificationModule { }
