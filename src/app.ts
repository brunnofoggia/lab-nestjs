import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExceptionInterceptor } from '@modules/common/interceptors/exception.interceptor';

async function createApp({ Module }) {
    const app = await NestFactory.create(Module);
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true
    }));
    app.useGlobalInterceptors(new ExceptionInterceptor());
    return app;
}

// used to run standalone applications
async function createAppContext({ Module, options = {} }) {
    const app = await NestFactory.createApplicationContext(Module, options || {});
    return app;
}

async function httpApi(app, port) {
    return await app.listen(port);
}

function getExpressApp(app) {
    return app.getHttpAdapter().getInstance();
}

export { createApp, createAppContext, httpApi, getExpressApp };
