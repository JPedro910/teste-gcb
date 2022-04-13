import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertSpecialities1649255082565 implements MigrationInterface {
  public async up(queryRunner: QueryRunner) {
    await queryRunner.query(
      `INSERT INTO specialty (id, name) VALUES ('1', 'Alerlegologia');`,
    );
    await queryRunner.query(
      `INSERT INTO specialty (id, name) VALUES ('2', 'Angiologia');`,
    );
    await queryRunner.query(
      `INSERT INTO specialty (id, name) VALUES ('3', 'Cardiologia Clínica');`,
    );
    await queryRunner.query(
      `INSERT INTO specialty (id, name) VALUES ('4', 'Cardiologia Infantil');`,
    );
    await queryRunner.query(
      `INSERT INTO specialty (id, name) VALUES ('5', 'Cirurgia de Cabeça e Pescoço');`,
    );
    await queryRunner.query(
      `INSERT INTO specialty (id, name) VALUES ('6', 'Cirurgia Cardiádica');`,
    );
    await queryRunner.query(
      `INSERT INTO specialty (id, name) VALUES ('7', 'Cirurgia de Tórax');`,
    );
  }

  public async down(queryRunner: QueryRunner) {
    await queryRunner.query(`DELETE FROM specialty`);
  }
}
