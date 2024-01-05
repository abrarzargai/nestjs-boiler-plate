import { ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { DBErrorCode } from '../enums/db-error-code.enum';
export declare class QueryFailedErrorFilter extends BaseExceptionFilter {
    private readonly logger;
    protected readonly POSTGRES_UNIQUE_VIOLATION = DBErrorCode.PgUniqueConstraintViolation;
    catch(exception: QueryFailedError, host: ArgumentsHost): Response;
}
