import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import _ from 'lodash';

import { loadConfig, config } from '@config/config';

const dir = process.env.IS_TS_NODE || config.TEST_ENV ? 'src' : 'dist';
const ext = process.env.IS_TS_NODE || config.TEST_ENV ? '.ts' : '.js';

export const DatabaseOptions = async () => {
    const config = await loadConfig();

    // replication
    const DB = !config.DB.slave ? {
        ...config.DB
    } : {
        type: config.DB.type,
        replication: {
            master: {
                ..._.omit(config.DB, 'slave')
            },
            slaves: [{
                ..._.omit(config.DB, 'slave'),
                host: config.DB.host.replace('cluster-', 'cluster-' + config.DB.slave),
            }]
        }
    };

    return (!config.TEST_ENV ? {
        ...DB,
        entities: [
            // UserEntity,
            `${dir}/modules/**/entities/*.entity${ext}` // does not work with webpack ??
        ],
        migrations: [
            `${dir}/modules/**/migrations/*${ext}`
        ],
    } : {
        type: 'sqlite',
        database: ':memory:',
        synchronize: true,
        dropSchema: true,
        entities: ['src/**/*.entity.ts'],
        // entities: [`${dir}/modules/**/*.entity${ext}`],
    }) as DataSourceOptions;
};

// export const DatabaseModule = TypeOrmModule.forRoot({ ...DatabaseModuleOptions } as TypeOrmModuleOptions);
export const DatabaseConfigModule = TypeOrmModule.forRootAsync(
    { useFactory: async () => await DatabaseOptions(), }
    // { useFactory: (config: ConfigService) => config, } // ConfigService
    // { ...DatabaseModuleOptions } as TypeOrmModuleOptions
);
