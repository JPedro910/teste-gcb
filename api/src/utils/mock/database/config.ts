import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const database: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'src/utils/mock/database/sqlite.sql',
  entities: ['src/**/*.entity{.ts,.js}'],
  synchronize: true,
  keepConnectionAlive: true,
};
