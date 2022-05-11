import { MigrationInterface, QueryRunner } from "typeorm";

export class createItem1652301719611 implements MigrationInterface {
    name = 'createItem1652301719611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`item\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`imageUrl\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`specification\` json NOT NULL, \`itemGroupId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`item\` ADD CONSTRAINT \`FK_b0e27715ec6c59f16241121a2c5\` FOREIGN KEY (\`itemGroupId\`) REFERENCES \`item_group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`item\` DROP FOREIGN KEY \`FK_b0e27715ec6c59f16241121a2c5\``);
        await queryRunner.query(`DROP TABLE \`item\``);
    }

}
