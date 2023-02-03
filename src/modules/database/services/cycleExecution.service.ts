import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CycleExecutionEntity } from '@modules/database/entities/cycleExecution.entity';
import { CrudService } from '@common/services/crud.service';
import { Between, Like } from 'typeorm';

@Injectable()
export class CycleExecutionService extends CrudService<CycleExecutionEntity> {
    constructor(@InjectRepository(CycleExecutionEntity) protected readonly repository) {
        super();
    }
}
