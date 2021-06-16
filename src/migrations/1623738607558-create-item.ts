import {MigrationInterface, QueryRunner} from "typeorm";

export class createItem1623738607558 implements MigrationInterface {
    name = 'createItem1623738607558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_to_group_model" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "groupId" integer NOT NULL, "stateFlg" integer NOT NULL, CONSTRAINT "PK_46369d137e05536e48866a9064b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_to_group_model" ADD CONSTRAINT "FK_9be5229172c28508d2460ccc265" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_to_group_model" ADD CONSTRAINT "FK_a91fe436f83b30b663e562273f9" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_to_group_model" DROP CONSTRAINT "FK_a91fe436f83b30b663e562273f9"`);
        await queryRunner.query(`ALTER TABLE "user_to_group_model" DROP CONSTRAINT "FK_9be5229172c28508d2460ccc265"`);
        await queryRunner.query(`DROP TABLE "user_to_group_model"`);
    }

}
