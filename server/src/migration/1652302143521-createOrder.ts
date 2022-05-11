import { MigrationInterface, QueryRunner } from "typeorm";

export class createOrder1652302143521 implements MigrationInterface {
    name = 'createOrder1652302143521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`targetLocation\` json NOT NULL, \`status\` enum ('PENDING', 'ACCEPTED', 'REJECTED', 'DELIVERED') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`acceptedAt\` datetime NOT NULL, \`rejectedAt\` datetime NOT NULL, \`delivereddAt\` datetime NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``);
        await queryRunner.query(`DROP TABLE \`order\``);
    }

}
