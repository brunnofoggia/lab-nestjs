import { Controller, Get, Inject, Param, UseInterceptors } from '@nestjs/common';
import { CycleConfigService } from '@database/services/cycleConfig.service';
import { CreateCycleConfigDto, UpdateCycleConfigDto } from './dto/cycleConfig.dto';
import { CycleConfigInterface } from './interfaces/cycleConfig.interface';
import { ParseIntOrStringPipe } from '@common/pipes/parseIntOrString.pipe';
import { NullResponseInterceptor } from '@modules/common/interceptors/nullresponse.interceptor';
import { CrudController } from '@common/controllers/crud.controller';
import { CycleConfigDomain } from '@modules/cycleConfig/cycleConfig.domain';

@Controller('cycle_config')
export class CycleConfigController extends CrudController<CycleConfigInterface, CreateCycleConfigDto, UpdateCycleConfigDto> {
    protected createDto = CreateCycleConfigDto;
    protected updateDto = UpdateCycleConfigDto;
    @Inject(CycleConfigDomain) protected domain: CycleConfigDomain;
    public readonly service = () => this.domain.service();

    @Get('/find_deep/:id')
    @UseInterceptors(new NullResponseInterceptor())
    async findDeep(@Param('id', ParseIntOrStringPipe) id: number | string): Promise<CycleConfigInterface> {
        return await this.domain.findDeep(id);
    }
}
