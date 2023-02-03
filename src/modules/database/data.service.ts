import { Inject, Injectable, Scope } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

@Injectable({ scope: Scope.TRANSIENT })
export class DataService {
    protected loaded = [];

    constructor(private moduleRef: ModuleRef) { }

    private load(Service: any) {
        !this.loaded[Service.name] && (this.loaded[Service.name] = this.moduleRef.get(Service));
        return this.loaded[Service.name];
    }

    get(Service: any) {
        return (this.loaded[Service.name] || this.load(Service));
    }
}
