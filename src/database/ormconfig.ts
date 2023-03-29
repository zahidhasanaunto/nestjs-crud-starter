import { ENV, ormConfig } from '@src/env';
import { join } from 'path';
import { DataSource } from 'typeorm';

export const dbConnectionOptions = new DataSource({
  type: 'postgres',
  host: ormConfig.host,
  port: ormConfig.port,
  username: ormConfig.username,
  password: ormConfig.password,
  database: ormConfig.database,
  ssl: ENV.isProduction ? { rejectUnauthorized: false } : false,
  synchronize: ormConfig.synchronize,
  dropSchema: false,
  migrationsRun: true,
  logging: ['migration'],
  logger: ENV.isProduction ? 'file' : 'debug',
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
});
