import { Module } from '@nestjs/common';
import { CycleExecutionController } from './cycleExecution.controller';
import { CycleExecutionDomain } from './cycleExecution.domain';

@Module({
    imports: [],
    controllers: [CycleExecutionController],
    providers: [CycleExecutionDomain]
})
export class CycleExecutionModule { }
