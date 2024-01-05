import { ArgumentsHost, ExceptionFilter, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
export declare class HttpErrorFilter implements ExceptionFilter {
    private readonly logger;
    catch(exception: InternalServerErrorException, host: ArgumentsHost): Response;
}
