import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { LogLevel } from '@nestjs/common/services/logger.service';
import { ConsoleLoggerOptions } from '@nestjs/common/services/console-logger.service';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger extends ConsoleLogger {
  constructor() {
    const options: ConsoleLoggerOptions = {
      json: true,
    };
    super(options);
  }

  error(message: any, ...optionalParams: [...any, string?]): void {
    super.error(message, optionalParams);
  }

  log(message: any, ...optionalParams: [...any, string?]): void {
    super.log(message, optionalParams);
  }

  warn(message: any, ...optionalParams: [...any, string?]): void {
    super.warn(message, optionalParams);
  }

  debug(message: any, ...optionalParams: [...any, string?]): void {
    super.debug(message, optionalParams);
  }

  verbose(message: any, ...optionalParams: [...any, string?]): void {
    super.verbose(message, optionalParams);
  }

  fatal(message: any, ...optionalParams: [...any, string?]): void {
    super.fatal(message, optionalParams);
  }

  setLogLevels(levels: LogLevel[]): void {
    super.setLogLevels(levels);
  }

  setContext(context: string): void {
    super.setContext(context);
  }
}
