import { Module } from '@nestjs/common';
import { StageExecutionController } from './stageExecution.controller';

@Module({
    imports: [],
    controllers: [StageExecutionController],
    providers: []
})
export class StageExecutionModule { }
