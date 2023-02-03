import { ApiProvider } from './api.provider';
import config from '@config/config';

export class CompanyProvider extends ApiProvider {
    static baseUrl = config.BRIDGE;
    static basePath = 'company';

    static async findCompany(uid: string) {
        const url = [this.basePath, uid].join('/');
        return (await this.fetch({ url })).data;
    }
}
