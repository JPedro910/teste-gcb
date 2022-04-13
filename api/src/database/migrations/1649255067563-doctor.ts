import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class doctor1649255067563 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'doctor',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '120',
          },
          {
            name: 'crm',
            type: 'varchar',
            length: '7',
          },
          {
            name: 'specialties',
            type: 'varchar',
          },
          {
            name: 'landline',
            type: 'varchar',
            length: '10',
          },
          {
            name: 'cellPhone',
            type: 'varchar',
            length: '11',
          },
          {
            name: 'cep',
            type: 'varchar',
            length: '8',
          },
          {
            name: 'street',
            type: 'varchar',
          },
          {
            name: 'district',
            type: 'varchar',
          },
          {
            name: 'city',
            type: 'varchar',
          },
          {
            name: 'state',
            type: 'varchar',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            default: null,
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('doctor');
  }
}
