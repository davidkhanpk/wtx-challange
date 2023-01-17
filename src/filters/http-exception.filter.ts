import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from  '@nestjs/common';
import { Request, Response } from 'express'
import { ErrorMessages } from '../utilities/error-messages';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly errorMessage: ErrorMessages) {}
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();

        const request = ctx.getRequest<Request>() 
        const response = ctx.getResponse<Response>()
        const status = exception.getStatus();

        response.status(status).json({
            statusCode: status,
            timeStamp: new Date().toISOString(),
            path: request.url,
            message: this.errorMessage.getExceptionMessageText(status)
        })
    }

}