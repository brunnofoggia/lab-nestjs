import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { StageConfigService } from '../database/services/stageConfig.service';
import { StageConfigDto } from './dto/stageConfig.dto';
import { StageConfigInterface } from './interfaces/stageConfig.interface';
import { CrudController } from '@common/controllers/crud.controller';
import { DataService } from '@database/data.service';
import { TriggerConfigDto } from './dto/triggerConfig.dto';

@Controller('stage_config')
export class StageConfigController extends CrudController<StageConfigInterface, StageConfigDto, StageConfigDto> {
    @Inject(DataService) protected dataService: DataService;
    protected service = () => this.dataService.get(StageConfigService);
    protected createDto = StageConfigDto;

    @Get('schedule')
    async findSchedule(): Promise<StageConfigInterface[]> {
        return await this.service().findSchedule({ relations: { cycleConfig: true } });
    }

    @Post('scheduleByConfig')
    async findScheduleByConfig(@Body() triggerConfig: TriggerConfigDto): Promise<any> {
        return await this.service().findScheduleByConfig(triggerConfig);
    }
}
