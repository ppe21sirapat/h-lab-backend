import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';
dotenvConfig({ path: '.env' });

export const dataSourceOption = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNC || false,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  logging: false,
};

export default registerAs('typeorm', () => dataSourceOption);
export const dataSource = new DataSource(dataSourceOption as DataSourceOptions);
