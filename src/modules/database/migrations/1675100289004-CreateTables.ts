import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1675100289004 implements MigrationInterface {
    name = 'CreateTables1675100289004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."stage_status" AS ENUM('I', 'W', 'D', 'F')`);
        await queryRunner.query(`CREATE TABLE "stage_execution" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "cycle_execution_id" integer NOT NULL, "stage_config_id" integer NOT NULL, "status_uid" "public"."stage_status" NOT NULL DEFAULT 'I', CONSTRAINT "PK_73bb3900c2f8b931298787cd836" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."stage" AS ENUM('m9_imp', 'm9_conv_imp', 'm9_process', 'm9_conv_fia', 'm9_exp_fia', 'm9_conv_erp', 'm9_exp_erp')`);
        await queryRunner.query(`CREATE TYPE "public"."cycle2" AS ENUM('m0', 'm1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9')`);
        await queryRunner.query(`CREATE TYPE "public"."stage2" AS ENUM('m9_imp', 'm9_conv_imp', 'm9_process', 'm9_conv_fia', 'm9_exp_fia', 'm9_conv_erp', 'm9_exp_erp')`);
        await queryRunner.query(`CREATE TYPE "public"."stageTrigger" AS ENUM('A', 'S')`);
        await queryRunner.query(`CREATE TYPE "public"."stage_handler" AS ENUM('stage', 'stage_async', 'm9/fiab/imp', 'm9/fiab/proc', 'm9/fiab/conv', 'm9/fiab/exp')`);
        await queryRunner.query(`CREATE TABLE "stage_config" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "cycle_config_id" integer NOT NULL, "stage_uid" "public"."stage" NOT NULL, "input_cycle_uid" "public"."cycle2", "input_stage_uid" "public"."stage2", "trigger_uid" "public"."stageTrigger" NOT NULL DEFAULT 'A', "trigger_config" jsonb NOT NULL DEFAULT '{}', "integration_config" jsonb NOT NULL DEFAULT '{}', "order" smallint NOT NULL DEFAULT '0', "handler_path" "public"."stage_handler", CONSTRAINT "PK_d2594cff60f110afb85dc7f0b34" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."cycle" AS ENUM('m0', 'm1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9')`);
        await queryRunner.query(`CREATE TYPE "public"."cycle_handler" AS ENUM('cycle')`);
        await queryRunner.query(`CREATE TABLE "cycle_config" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "company_uid" character varying NOT NULL, "cycle_uid" "public"."cycle" NOT NULL, "handler_path" "public"."cycle_handler", CONSTRAINT "PK_76773aa46505649e748dc7d129a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cycle_execution" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "company_uid" character varying NOT NULL, "cycle_config_id" integer NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_f3270087260b85c7cc4eda8404a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "stage_execution" ADD CONSTRAINT "FK_ecae6670af2c12a97fbb396d9c0" FOREIGN KEY ("cycle_execution_id") REFERENCES "cycle_execution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stage_execution" ADD CONSTRAINT "FK_ba50d3c1eadd664c11a40d638bb" FOREIGN KEY ("stage_config_id") REFERENCES "stage_config"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stage_config" ADD CONSTRAINT "FK_9e097e9b9b79b8f118217dd25a2" FOREIGN KEY ("cycle_config_id") REFERENCES "cycle_config"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cycle_execution" ADD CONSTRAINT "FK_58512fbf8900eccc482c298e03c" FOREIGN KEY ("cycle_config_id") REFERENCES "cycle_config"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cycle_execution" DROP CONSTRAINT "FK_58512fbf8900eccc482c298e03c"`);
        await queryRunner.query(`ALTER TABLE "stage_config" DROP CONSTRAINT "FK_9e097e9b9b79b8f118217dd25a2"`);
        await queryRunner.query(`ALTER TABLE "stage_execution" DROP CONSTRAINT "FK_ba50d3c1eadd664c11a40d638bb"`);
        await queryRunner.query(`ALTER TABLE "stage_execution" DROP CONSTRAINT "FK_ecae6670af2c12a97fbb396d9c0"`);
        await queryRunner.query(`DROP TABLE "cycle_execution"`);
        await queryRunner.query(`DROP TABLE "cycle_config"`);
        await queryRunner.query(`DROP TYPE "public"."cycle_handler"`);
        await queryRunner.query(`DROP TYPE "public"."cycle"`);
        await queryRunner.query(`DROP TABLE "stage_config"`);
        await queryRunner.query(`DROP TYPE "public"."stage_handler"`);
        await queryRunner.query(`DROP TYPE "public"."stageTrigger"`);
        await queryRunner.query(`DROP TYPE "public"."stage2"`);
        await queryRunner.query(`DROP TYPE "public"."cycle2"`);
        await queryRunner.query(`DROP TYPE "public"."stage"`);
        await queryRunner.query(`DROP TABLE "stage_execution"`);
        await queryRunner.query(`DROP TYPE "public"."stage_status"`);
    }

}
