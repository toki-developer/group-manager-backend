import {MigrationInterface, QueryRunner} from "typeorm";

export class createItem1623744821252 implements MigrationInterface {
    name = 'createItem1623744821252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "membership" DROP CONSTRAINT "PK_83c1afebef3059472e7c37e8de8"`);
        await queryRunner.query(`ALTER TABLE "membership" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "membership" ADD CONSTRAINT "PK_9c7d697a4844cf8b931988b24f4" PRIMARY KEY ("userId", "groupId")`);
        await queryRunner.query(`ALTER TABLE "membership" DROP CONSTRAINT "FK_eef2d9d9c70cd13bed868afedf4"`);
        await queryRunner.query(`ALTER TABLE "membership" DROP CONSTRAINT "FK_8bc1674087575acecf0a648fc91"`);
        await queryRunner.query(`ALTER TABLE "membership" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "membership"."userId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "membership" ALTER COLUMN "groupId" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "membership"."groupId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "membership" ADD CONSTRAINT "FK_eef2d9d9c70cd13bed868afedf4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "membership" ADD CONSTRAINT "FK_8bc1674087575acecf0a648fc91" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "membership" DROP CONSTRAINT "FK_8bc1674087575acecf0a648fc91"`);
        await queryRunner.query(`ALTER TABLE "membership" DROP CONSTRAINT "FK_eef2d9d9c70cd13bed868afedf4"`);
        await queryRunner.query(`COMMENT ON COLUMN "membership"."groupId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "membership" ALTER COLUMN "groupId" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "membership"."userId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "membership" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "membership" ADD CONSTRAINT "FK_8bc1674087575acecf0a648fc91" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "membership" ADD CONSTRAINT "FK_eef2d9d9c70cd13bed868afedf4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "membership" DROP CONSTRAINT "PK_9c7d697a4844cf8b931988b24f4"`);
        await queryRunner.query(`ALTER TABLE "membership" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "membership" ADD CONSTRAINT "PK_83c1afebef3059472e7c37e8de8" PRIMARY KEY ("id")`);
    }

}
