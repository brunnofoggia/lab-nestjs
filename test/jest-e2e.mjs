import jestConfig from '../jest.config.mjs';

const src = '/../src';
for (var index in jestConfig.moduleNameMapper) {
    jestConfig.moduleNameMapper[index] =
        jestConfig.moduleNameMapper[index]
            .replace('<rootDir>', '<rootDir>' + src);
}

export default {
    'moduleFileExtensions': [
        'js',
        'json',
        'ts'
    ],
    'rootDir': '.',
    'testEnvironment': 'node',
    'testRegex': '\\.e2e-spec\\.ts$',
    'transform': {
        '^.+\\.(t|j)s$': 'ts-jest'
    },
    'moduleNameMapper': jestConfig.moduleNameMapper
};
