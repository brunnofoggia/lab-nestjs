import { Module } from '@nestjs/common';
import { StageConfigController } from './stageConfig.controller';

@Module({
    imports: [],
    controllers: [StageConfigController],
    providers: [],
    exports: [],
})
export class StageConfigModule { }
