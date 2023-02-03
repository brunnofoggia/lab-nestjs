import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveColumn1675111155441 implements MigrationInterface {
    name = 'RemoveColumn1675111155441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cycle_execution" DROP COLUMN "company_uid"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cycle_execution" ADD "company_uid" character varying NOT NULL`);
    }

}
