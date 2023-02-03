import { Module } from '@nestjs/common';
import { CycleConfigController } from './cycleConfig.controller';
import { CycleConfigDomain } from '@modules/cycleConfig/cycleConfig.domain';

@Module({
    imports: [],
    controllers: [CycleConfigController],
    providers: [CycleConfigDomain]
})
export class CycleConfigModule { }
