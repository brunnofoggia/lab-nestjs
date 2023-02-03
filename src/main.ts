if (!process.env.IS_TS_NODE && !process.env.IS_OFFLINE) {
    require('module-alias/register');
}

import { AppModule } from '@app/app.module';
import { createApp, httpApi } from './app';

async function bootstrap() {
    httpApi(await createApp({ Module: AppModule }), +process.env.PORT || 3001);
}

bootstrap();
