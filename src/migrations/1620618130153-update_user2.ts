import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUser21620618130153 implements MigrationInterface {
    name = 'updateUser21620618130153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_groups_group" DROP CONSTRAINT "FK_84ff6a520aee2bf2512c01cf462"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user_groups_group" DROP CONSTRAINT "PK_98d481413dbe5578ad2a45ab863"`);
        await queryRunner.query(`ALTER TABLE "user_groups_group" ADD CONSTRAINT "PK_8abdfe8f9d78a4f5e821dbf6203" PRIMARY KEY ("groupId")`);
        await queryRunner.query(`DROP INDEX "IDX_84ff6a520aee2bf2512c01cf46"`);
        await queryRunner.query(`ALTER TABLE "user_groups_group" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user_groups_group" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_groups_group" DROP CONSTRAINT "PK_8abdfe8f9d78a4f5e821dbf6203"`);
        await queryRunner.query(`ALTER TABLE "user_groups_group" ADD CONSTRAINT "PK_98d481413dbe5578ad2a45ab863" PRIMARY KEY ("groupId", "userId")`);
        await queryRunner.query(`CREATE INDEX "IDX_84ff6a520aee2bf2512c01cf46" ON "user_groups_group" ("userId") `);
        await queryRunner.query(`ALTER TABLE "user_groups_group" ADD CONSTRAINT "FK_84ff6a520aee2bf2512c01cf462" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_groups_group" DROP CONSTRAINT "FK_84ff6a520aee2bf2512c01cf462"`);
        await queryRunner.query(`DROP INDEX "IDX_84ff6a520aee2bf2512c01cf46"`);
        await queryRunner.query(`ALTER TABLE "user_groups_group" DROP CONSTRAINT "PK_98d481413dbe5578ad2a45ab863"`);
        await queryRunner.query(`ALTER TABLE "user_groups_group" ADD CONSTRAINT "PK_8abdfe8f9d78a4f5e821dbf6203" PRIMARY KEY ("groupId")`);
        await queryRunner.query(`ALTER TABLE "user_groups_group" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user_groups_group" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_84ff6a520aee2bf2512c01cf46" ON "user_groups_group" ("userId") `);
        await queryRunner.query(`ALTER TABLE "user_groups_group" DROP CONSTRAINT "PK_8abdfe8f9d78a4f5e821dbf6203"`);
        await queryRunner.query(`ALTER TABLE "user_groups_group" ADD CONSTRAINT "PK_98d481413dbe5578ad2a45ab863" PRIMARY KEY ("userId", "groupId")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user_groups_group" ADD CONSTRAINT "FK_84ff6a520aee2bf2512c01cf462" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
