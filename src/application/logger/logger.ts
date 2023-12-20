export namespace Logger {
  export const name = 'Logger';
  export type ErrorCategory = 'VLD' | 'MSG' | 'API' | 'HTTP';
}

export interface Logger {
  info(message: string | object): void;
  infoHTTP(message: object): void;
  error(error: any, message: string, category: Logger.ErrorCategory): void;
  fatal(error: any, message: string): void;
}
