import { Controller, Inject } from '@nestjs/common';
import { StageExecutionService } from '../database/services/stageExecution.service';
import { StageExecutionDto } from './dto/stageExecution.dto';
import { StageExecutionInterface } from './interfaces/stageExecution.interface';
import { CrudController } from '@common/controllers/crud.controller';
import { DataService } from '@database/data.service';

@Controller('stage_execution')
export class StageExecutionController extends CrudController<StageExecutionInterface, StageExecutionDto, StageExecutionDto> {
    @Inject(DataService) protected dataService: DataService;
    protected service = () => this.dataService.get(StageExecutionService);
    protected createDto = StageExecutionDto;
}
