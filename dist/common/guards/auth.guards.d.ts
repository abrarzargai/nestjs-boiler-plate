import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Connection } from 'typeorm';
export declare class TokenGuard implements CanActivate {
    private readonly connection;
    constructor(connection: Connection);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
