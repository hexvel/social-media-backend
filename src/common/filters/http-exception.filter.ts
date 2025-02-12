import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    this.logger.error(`
      Path: ${request.url}
      Method: ${request.method}
      Error: ${exception.message}
      Stack: ${exception.stack}
    `);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      method: request.url,
      message: exception.message,
    });
  }
}
