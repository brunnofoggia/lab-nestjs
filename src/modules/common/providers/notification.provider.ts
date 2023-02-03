import { ApiProvider } from './api.provider';
import config from '@config/config';

export class NotificationProvider extends ApiProvider {
    static baseUrl = config.BRIDGE;
    static basePath = 'notification';

    static async findGlobal() {
        const url = [this.basePath, 'findGlobal'].join('/');
        return (await this.fetch({ url })).data;
    }

    static async findByCompanyUid(uid: string) {
        const url = [this.basePath, 'findByCompanyUid', uid].join('/');
        return (await this.fetch({ url })).data;
    }
}
