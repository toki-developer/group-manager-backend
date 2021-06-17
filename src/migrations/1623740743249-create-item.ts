import {MigrationInterface, QueryRunner} from "typeorm";

export class createItem1623740743249 implements MigrationInterface {
    name = 'createItem1623740743249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "membership" DROP CONSTRAINT "FK_eef2d9d9c70cd13bed868afedf4"`);
        await queryRunner.query(`ALTER TABLE "membership" DROP CONSTRAINT "FK_8bc1674087575acecf0a648fc91"`);
        await queryRunner.query(`ALTER TABLE "membership" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "membership"."userId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "membership" ALTER COLUMN "groupId" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "membership"."groupId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "membership" ADD CONSTRAINT "FK_eef2d9d9c70cd13bed868afedf4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "membership" ADD CONSTRAINT "FK_8bc1674087575acecf0a648fc91" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "membership" DROP CONSTRAINT "FK_8bc1674087575acecf0a648fc91"`);
        await queryRunner.query(`ALTER TABLE "membership" DROP CONSTRAINT "FK_eef2d9d9c70cd13bed868afedf4"`);
        await queryRunner.query(`COMMENT ON COLUMN "membership"."groupId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "membership" ALTER COLUMN "groupId" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "membership"."userId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "membership" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "membership" ADD CONSTRAINT "FK_8bc1674087575acecf0a648fc91" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "membership" ADD CONSTRAINT "FK_eef2d9d9c70cd13bed868afedf4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
