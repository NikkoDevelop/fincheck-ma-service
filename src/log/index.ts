import * as path from 'path';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

import { SERVICE_NAME } from '../config';

const { align, colorize, combine, printf, timestamp } = winston.format;

export const logger = winston.createLogger({
  defaultMeta: {
    service: SERVICE_NAME
  },
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A'
    }),
    printf((info) => `[${info.timestamp}] [${info.level.toUpperCase()}]: ${info.message}`)
  ),
  transports: [
    new DailyRotateFile({
      datePattern: 'YYYY-MM-DD',
      filename: path.join(__dirname, 'logs', 'error-%DATE%.log'),
      level: 'error',
      maxFiles: '7d',
      zippedArchive: true
    }),
    new DailyRotateFile({
      datePattern: 'YYYY-MM-DD',
      filename: path.join(__dirname, 'logs', 'warn-%DATE%.log'),
      level: 'warn',
      maxFiles: '7d',
      zippedArchive: true
    }),
    new DailyRotateFile({
      datePattern: 'YYYY-MM-DD',
      filename: path.join(__dirname, 'logs', 'info-%DATE%.log'),
      level: 'info',
      maxFiles: '7d',
      zippedArchive: true
    }),

    new winston.transports.Console({
      format: combine(
        timestamp(),
        colorize({ all: true }),
        align()
      )
    })
  ]
});
