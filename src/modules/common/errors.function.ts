import { HttpException } from '@nestjs/common';
import errors from './errors.json';

const ERROR_LIST: any = {};
errors.forEach(error => ERROR_LIST[error] = error);

const ERROR_MESSAGES: any = {
    ...ERROR_LIST,
    'DEFAULT': 'Internal server error'
};

const errorMessage = ({ message = '', code = '', customErrors = {} }) => {
    return message || customErrors[code] || ERROR_MESSAGES[code] || ERROR_MESSAGES['DEFAULT'];
};

const throwHttpException = (message, httpStatus) => {
    throw new HttpException(message, httpStatus);
};

export { ERROR_LIST, ERROR_MESSAGES, errorMessage, throwHttpException };
export default errorMessage;
