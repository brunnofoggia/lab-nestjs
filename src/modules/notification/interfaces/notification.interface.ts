import { GenericInterface } from '@common/interfaces/generic.interface';

export interface NotificationInterface extends GenericInterface {
    companyUid?: string | null;
    destination: string;
    config: JSON;
}
