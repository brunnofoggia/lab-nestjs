import { Controller, Inject } from '@nestjs/common';

import { CrudController } from '@modules/common/controllers/crud.controller';
import { TestService } from '@common/services/crud.service.test';
import { IdInterface } from '@common/interfaces/id.interface';
import { DataService } from '@database/data.service';
import { GenericDto } from '@common/dto/generic.dto';

@Controller()
export class DataServiceController extends CrudController<IdInterface, GenericDto, GenericDto> {
    @Inject(DataService) protected dataService: DataService;
    public readonly service = () => this.dataService.get(TestService);
    protected createDto = GenericDto;
}
