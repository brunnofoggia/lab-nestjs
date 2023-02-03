import _ from 'lodash';

const _errors = [
    '23505', // pg:unique field
];

const DB_ERRORS: any = {};
_errors.forEach(error => DB_ERRORS[error] = error);

const DB_ERR_MSGS = {
    '23505': 'UNIQUE_FIELD',
    'DEFAULT': 'Query failed'
};

const DB_ERRORS_KEYS = _.invert(DB_ERR_MSGS);

const errorMessage = ({ message = '', code = '', customErrors = {} }) => {
    return message || customErrors[code] || DB_ERR_MSGS[code] || DB_ERR_MSGS['DEFAULT'];
};

export { DB_ERRORS, DB_ERRORS_KEYS, DB_ERR_MSGS, errorMessage };
export default errorMessage;
