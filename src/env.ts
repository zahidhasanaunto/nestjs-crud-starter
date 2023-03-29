import { toBool, toNumber } from '@src/shared';
import { config } from 'dotenv';
import * as path from 'path';

config({
  path: path.join(
    process.cwd(),
    'environments',
    `${process.env.NODE_ENV || 'development'}.env`
  ),
});

export const ENV_DEVELOPMENT = 'development';
export const ENV_PRODUCTION = 'production';
export const ENV_STAGING = 'staging';
export const ENV_QA = 'qa';

export const ENV = {
  port: process.env.PORT,
  env: process.env.NODE_ENV || ENV_DEVELOPMENT,
  isProduction: process.env.NODE_ENV === ENV_PRODUCTION,
  isStaging: process.env.NODE_ENV === ENV_STAGING,
  isTest: process.env.NODE_ENV === ENV_QA,
  isDevelopment: process.env.NODE_ENV === ENV_DEVELOPMENT,

  api: {
    API_PREFIX: process.env.API_PREFIX,
    API_VERSION: process.env.API_VERSION,
    API_TITLE: process.env.API_TITLE,
    API_DESCRIPTION: process.env.API_DESCRIPTION,
  },

  security: {
    CORS_ALLOWED_ORIGINS: process.env.CORS_ALLOWED_ORIGINS.split(','),
    RATE_LIMIT_TTL: toNumber(process.env.RATE_LIMIT_TTL),
    RATE_LIMIT_MAX: toNumber(process.env.RATE_LIMIT_MAX),
  },

  logger: {
    LOG_FOLDER: process.env.LOG_FOLDER,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    saltRound: toNumber(process.env.JWT_SALT_ROUNDS),
    tokenExpireIn: process.env.JWT_EXPIRES_IN,
    refreshTokenExpireIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  },

  auth: {
    otpExpireIn: toNumber(process.env.OTP_EXPIRES_IN),
  },

  db: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,

    synchronize: toBool(process.env.DB_SYNCHRONIZE),
    logging: toBool(process.env.DB_LOGGING),
  },
};

export const ormConfig = {
  type: ENV.db.type,
  host: ENV.db.host,
  port: +ENV.db.port,
  username: ENV.db.username,
  password: ENV.db.password,
  database: ENV.db.database,
  synchronize: ENV.db.synchronize,
  logging: ENV.db.logging,
  autoLoadEntities: true,
};
