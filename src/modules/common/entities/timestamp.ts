import { Column } from 'typeorm';
import { set } from '@config/entities';

export class TimestampEntity {
    @Column(set({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }))
    createdAt?: Date;

    @Column(set({
        name: 'updated_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: () => "CURRENT_TIMESTAMP(6)"
    }))
    updatedAt?: Date;

    @Column(set({
        name: 'deleted_at',
        type: 'timestamptz',
        default: null
    }))
    deletedAt?: Date;
}

