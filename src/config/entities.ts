import config from '@config/config';

const sqliteType = {
    json: 'text',
    jsonb: 'text',
    enum: 'simple-array',
    timestamptz: 'datetime'
};

const typeSettings = {
    'datetime': (settings) => {
        settings.default = null;
        delete settings.onUpdate;
        return settings;
    },
    'text': (settings) => {
        settings.default = null;
        return settings;
    },
};

const entities: any = {};
entities.column = (settings) => {
    if (config.TEST_ENV) {
        settings.type = sqliteType[settings.type] ?? settings.type;
        typeSettings[settings.type] && (settings = typeSettings[settings.type](settings));
    }
    return settings;
};

export const set = (settings, options = { type: 'column' }) => {
    if (!config.TEST_ENV) {
        return settings;
    }
    return entities[options.type] ? entities[options.type](settings) : settings;
};
