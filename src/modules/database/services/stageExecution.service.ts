import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StageExecutionEntity } from '@modules/database/entities/stageExecution.entity';
import { CrudService } from '@common/services/crud.service';

@Injectable()
export class StageExecutionService extends CrudService<StageExecutionEntity> {
    constructor(@InjectRepository(StageExecutionEntity) protected readonly repository) {
        super();
    }
}
