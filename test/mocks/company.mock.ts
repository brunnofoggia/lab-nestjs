import { CompanyDto } from '@modules/company/dto/company.dto';


const d = new Date();

export const create: CompanyDto = {
    id: 1,
    uid: 'xxx',
    cnpj: '1111',
    timezone: '+00',
    createdAt: d,
    updatedAt: d,
    deletedAt: d,
};

export const item = {
    createdAt: d,
    updatedAt: d,
    ...create
};

export const update = {
    ...create,
    createdAt: d,
    updatedAt: d,
    nome: 'test2',
};

export const idResponse = { id: 1 };
