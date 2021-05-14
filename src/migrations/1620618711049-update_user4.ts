import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUser41620618711049 implements MigrationInterface {
    name = 'updateUser41620618711049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
    }

}
