import { CacheModule, Module } from '@nestjs/common';

import { DatabaseConfigModule } from '@database/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CycleConfigModule } from '@modules/cycleConfig/cycleConfig.module';
import { StageConfigModule } from '@modules/stageConfig/stageConfig.module';
import { CycleExecutionModule } from '@modules/cycleExecution/cycleExecution.module';
import { StageExecutionModule } from '@modules/stageExecution/stageExecution.module';
import { DataService } from '@database/data.service';
import { DataServiceModule } from '@modules/database/data.service.module';
import { NotificationModule } from '@modules/notification/notification.module';

@Module({
    imports: [
        CacheModule.register({
            isGlobal: true
        }),
        DatabaseConfigModule,
        DataServiceModule,
        CycleConfigModule,
        StageConfigModule,
        CycleExecutionModule,
        StageExecutionModule,
        NotificationModule,
    ],
    controllers: [AppController],
    providers: [
        AppService
    ],
    exports: []
})
export class AppModule { }
