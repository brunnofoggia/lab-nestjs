import axios from 'axios';
import { ERROR_LIST, throwHttpException } from '@/modules/common/errors.function';
import { sleep } from '../utils';
import { HttpStatus } from '@nestjs/common';

export class ApiProvider {
    static _sleep = 500;
    static baseUrl = '';

    static async fetch(options, _retry = 3) {
        try {
            return await this._fetch({
                ...options,
                url: [this.baseUrl, options.url].join('/'),
            });
        } catch (err) {
            if (err.code === ERROR_LIST.ECONNREFUSED && _retry > 0) {
                await sleep(this._sleep);
                return await this.fetch(options, _retry - 1);
            }

            const data: any = typeof err.response?.data === 'object' ?
                JSON.stringify(err.response?.data) :
                err.response?.data || '';
            throwHttpException([err.code, err.message || '', data].join(";\n"), HttpStatus.BAD_GATEWAY);
        }
    }

    static async _fetch(options) {
        return await axios(options);
    }
}
