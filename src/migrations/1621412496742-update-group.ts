import {MigrationInterface, QueryRunner} from "typeorm";

export class updateGroup1621412496742 implements MigrationInterface {
    name = 'updateGroup1621412496742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group" ADD "searchId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "group" ADD CONSTRAINT "UQ_eb536fdf174ad2083ee1d273f26" UNIQUE ("searchId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group" DROP CONSTRAINT "UQ_eb536fdf174ad2083ee1d273f26"`);
        await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "searchId"`);
    }

}
