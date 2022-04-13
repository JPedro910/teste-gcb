import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  connectTimeout: 20000,
  migrationsRun: true
};
