import 'dotenv/config';
// import { getSecretData } from "@serverless/kms";

const config: any = {
    TEST_ENV: process.env.NODE_ENV === 'test',
    BRIDGE: process.env.BRIDGE,
    AUTH: {
        JWT: {
            privateKey: process.env.JWT_KEY,
            options: {
                expiresIn: process.env.JWT_EXPIRES
            }
        }
    },
};


export { config };
export default config;

const dbConfig = async () => {
    let DB;
    if (config.TEST_ENV || (process.env.IS_TS_NODE && process.env.DB_CONNECT !== 'remote')) { // || process.env.IS_OFFLINE
        DB = {
            type: process.env.DB_TYPE,
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            synchronize: process.env.DB_SYNC === 'true',
            slave: ''
        };
    } else {
        // try {
        //     const dbSecret = process.env.IS_OFFLINE || process.env.IS_TS_NODE ? process.env.AWS_DB : await getSecretData('DB');
        //     console.log('private -> DB: ', dbSecret);
        //     const [type, host, port, database, username, password, sync, slave] = dbSecret.split(';');
        //     DB = {
        //         type,
        //         host,
        //         port: +port,
        //         username,
        //         password,
        //         database,
        //         synchronize: sync === 'true',
        //         slave
        //     };
        // } catch (err) {
        //     throw new Error(err);
        // }
    }
    return DB;
};

export const loadConfig = async () => {
    if (!config?.DB)
        config.DB = await dbConfig();

    return config;
};
