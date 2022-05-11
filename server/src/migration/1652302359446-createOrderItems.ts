import { MigrationInterface, QueryRunner } from "typeorm";

export class createOrderItems1652302359446 implements MigrationInterface {
    name = 'createOrderItems1652302359446'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`order_item\` (\`id\` int NOT NULL AUTO_INCREMENT, \`itemName\` varchar(255) NOT NULL, \`count\` int NOT NULL, \`itemPrice\` int NOT NULL, \`itemId\` int NULL, \`orderId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_e03f3ed4dab80a3bf3eca50babc\` FOREIGN KEY (\`itemId\`) REFERENCES \`item\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_646bf9ece6f45dbe41c203e06e0\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_646bf9ece6f45dbe41c203e06e0\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_e03f3ed4dab80a3bf3eca50babc\``);
        await queryRunner.query(`DROP TABLE \`order_item\``);
    }

}
