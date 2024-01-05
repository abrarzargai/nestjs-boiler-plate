import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm';
export declare class EntityNotFoundErrorFilter implements ExceptionFilter {
    private readonly logger;
    catch(exception: EntityNotFoundError, host: ArgumentsHost): Response;
}
