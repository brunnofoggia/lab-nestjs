import { DataSource } from 'typeorm';
import { DatabaseOptions } from './config';

const buildDataSource = async () => new DataSource({
    ...await DatabaseOptions(),
});

export default buildDataSource();
