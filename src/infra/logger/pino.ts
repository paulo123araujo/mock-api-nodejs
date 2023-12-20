import pino, { Logger as IPinoLogger } from 'pino';
import { env } from '@/env';
import { Logger } from '@/application/logger/logger';

interface LoggerChildrens {
  VLD: IPinoLogger;
  MSG: IPinoLogger;
  API: IPinoLogger;
  HTTP: IPinoLogger;
}

export class PinoLogger implements Logger {
  private logger: IPinoLogger;

  private loggersChildrens;

  constructor() {
    this.logger = pino({
      name: 'bcodex-pix',
      transport:
        env.NODE_ENV === 'prod' ? undefined : { target: 'pino-pretty' },
    });

    this.loggersChildrens = this.createChildrens();
  }

  public info(message: string | object): void {
    this.logger.info(message);
  }

  public infoHTTP(message: object): void {
    this.loggersChildrens.HTTP.info(message);
  }

  public error(
    error: any,
    message: string,
    category: Logger.ErrorCategory,
  ): void {
    this.selectLoggerError(error, message, category);
  }

  public fatal(error: any, message: string): void {
    this.logger.fatal(error, message);
  }

  private createChildrens(): LoggerChildrens {
    return {
      VLD: this.logger.child({ category: 'VLD' }),
      MSG: this.logger.child({ category: 'MSG' }),
      API: this.logger.child({ category: 'API' }),
      HTTP: this.logger.child({ category: 'HTTP' }),
    };
  }

  private selectLoggerError(
    error: object,
    message: string,
    category: Logger.ErrorCategory,
  ) {
    this.loggersChildrens[category].error(error, message);
  }
}

const logger = new PinoLogger();

export default logger;
