export default {
    'moduleFileExtensions': [
        'js',
        'json',
        'ts'
    ],
    'rootDir': 'src',
    'modulePaths': ['<rootDir>'],
    "testRegex": "\\.spec\\.ts$",
    'transform': {
        '^.+\\.(t|j)s$': 'ts-jest'
    },
    'collectCoverageFrom': [
        '**/*.(t|j)s'
    ],
    'coverageDirectory': '../coverage',
    'testEnvironment': 'node',
    'moduleNameMapper': {
        '@config/(.*)': '<rootDir>/config/$1',
        '@common/(.*)': '<rootDir>/modules/common/$1',
        '@app/(.*)': '<rootDir>/modules/app/$1',
        '@database/(.*)': '<rootDir>/modules/database/$1',
        '@auth/(.*)': '<rootDir>/modules/auth/$1',
        '@test/(.*)': '<rootDir>/../test/$1',
        '@modules/(.*)': '<rootDir>/modules/$1',
        '@/(.*)': '<rootDir>/$1',
    },
};
