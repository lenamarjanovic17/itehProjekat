import { MigrationInterface, QueryRunner } from "typeorm";

export class createItemGroup1652301321945 implements MigrationInterface {
    name = 'createItemGroup1652301321945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`item_group\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`parentGroupId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`item_group\` ADD CONSTRAINT \`FK_5d7f577c313412719fec60c9207\` FOREIGN KEY (\`parentGroupId\`) REFERENCES \`item_group\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`item_group\` DROP FOREIGN KEY \`FK_5d7f577c313412719fec60c9207\``);
        await queryRunner.query(`DROP TABLE \`item_group\``);
    }

}
