import { Controller, Inject } from '@nestjs/common';

import { CrudController } from '@modules/common/controllers/crud.controller';
import { TestService } from '@common/services/crud.service.test';
import { IdInterface } from '@common/interfaces/id.interface';
import { GenericDto } from '@common/dto/generic.dto';

@Controller()
export class TestController extends CrudController<IdInterface, GenericDto, GenericDto> {
    // @Inject(DataService) protected dataService: DataService;
    @Inject(TestService) public readonly _service: TestService;
    public readonly service = () => this._service;
    protected createDto = GenericDto;
}

@Controller()
export class ForbidNonWhitelistedController extends CrudController<IdInterface, GenericDto, GenericDto> {
    // @Inject(DataService) protected dataService: DataService;
    @Inject(TestService) public readonly _service: TestService;
    public readonly service = () => this._service;
    // public readonly service = () => this.dataService.get(TestService);
    protected createDto = GenericDto;
    protected validationPipeOptions = {
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    };
}
