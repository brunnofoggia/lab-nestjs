import { Controller, Get, Inject, Param, UseInterceptors } from '@nestjs/common';
import { CrudController } from '@common/controllers/crud.controller';
import { ParseIntOrStringPipe } from '@common/pipes/parseIntOrString.pipe';
import { NullResponseInterceptor } from '@modules/common/interceptors/nullresponse.interceptor';

import { CycleExecutionDomain } from './cycleExecution.domain';
import { CycleExecutionDto } from './dto/cycleExecution.dto';
import { CycleExecutionResponseInterface } from './interfaces/cycleExecution.interface';

@Controller('cycle_execution')
export class CycleExecutionController extends CrudController<CycleExecutionResponseInterface, CycleExecutionDto, CycleExecutionDto> {
    protected createDto = CycleExecutionDto;
    @Inject(CycleExecutionDomain) protected domain: CycleExecutionDomain;
    public readonly service = () => this.domain.service();

    @Get('/find_deep/:id')
    @UseInterceptors(new NullResponseInterceptor())
    findDeep(@Param('id', ParseIntOrStringPipe) id: number | string): Promise<CycleExecutionResponseInterface> {
        return this.domain.findDeep(id);
    }
}
