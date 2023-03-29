import { LoggerService } from '@nestjs/common';
import { utilities, WinstonModule, WinstonModuleOptions } from 'nest-winston';
import { format, transports } from 'winston';
import { ENV } from './env';

export function createLogger(): LoggerService {
  const winstonOptions: WinstonModuleOptions = {
    transports: [
      new transports.Console({
        format: format.combine(format.timestamp(), utilities.format.nestLike()),
        level: 'debug',
      }),
      new transports.File({
        format: format.combine(format.timestamp(), utilities.format.nestLike()),
        filename: `${ENV.logger.LOG_FOLDER}/errors.log`,
        level: 'error',
      }),
      new transports.File({
        format: format.combine(format.timestamp(), utilities.format.nestLike()),
        filename: `${ENV.logger.LOG_FOLDER}/warnings.log`,
        level: 'warning',
      }),
      new transports.File({
        format: format.combine(format.timestamp(), utilities.format.nestLike()),
        filename: `${ENV.logger.LOG_FOLDER}/critical.log`,
        level: 'crit',
      }),
      new transports.File({
        format: format.combine(format.timestamp(), utilities.format.nestLike()),
        filename: `${ENV.logger.LOG_FOLDER}/log.log`,
        level: 'log',
      }),
    ],
  };

  return WinstonModule.createLogger(winstonOptions);
}
