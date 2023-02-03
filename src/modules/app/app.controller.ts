import { CacheInterceptor, CacheTTL, Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
    constructor(private readonly service: AppService) { }

    @Get()
    @CacheTTL(999)
    getRoot(): string {
        return this.service.getRoot();
    }
}
