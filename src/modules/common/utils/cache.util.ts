import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import CryptoJS from 'crypto-js';
import _ from 'lodash';

@Injectable()
export class CacheUtil {
    @Inject(CACHE_MANAGER) public manager: Cache;
    protected keyPrefix;
    protected ttl: number;

    set(keyPrefix: string, ttl: number) {
        this.keyPrefix = keyPrefix;
        this.ttl = ttl;
    }

    generateKey(methodName: string, id: number | string = '', options: any = {}): string {
        const cacheKey: string[] = [this.keyPrefix, methodName, id + ''];
        cacheKey.push(CryptoJS.MD5(JSON.stringify(options)).toString());

        return cacheKey.join('#');
    }

    async result(cacheKey: string, callback: any, cacheTTL = 0): Promise<any> {
        const cache: string = await this.manager.get(cacheKey);

        let result: any = null;
        try {
            result = JSON.parse(cache);
        } catch (err) {
            result = await callback();
            await this.manager.set(cacheKey, JSON.stringify(result), { ttl: cacheTTL || this.ttl || 3600 });
        }

        return result;
    }
}
