import { ERROR_LIST } from '@common/errors.function';
import { AxiosResponse } from 'axios';

export const request = {
    url: ''
};

export const response: AxiosResponse = {
    status: 200,
    statusText: '',
    headers: {},
    config: {},
    data: { some: 'data' }
};

export const reject = { code: ERROR_LIST.ECONNREFUSED };
