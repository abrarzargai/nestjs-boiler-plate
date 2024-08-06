import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import * as admin from "firebase-admin";
import { Connection } from "typeorm";

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly connection: Connection) {}
  //Token Guard
  async canActivate(context: ExecutionContext): Promise<boolean> {
   // Convert the execution context to a GraphQL execution context
   const gqlContext = GqlExecutionContext.create(context);
        
   // Access the GraphQL context
   const ctx = gqlContext.getContext();
   
   // Access request details from the context (if available)
   const request = ctx.req;  // Assuming the request object is available here
    if (!request.headers.authorization) {
      throw new HttpException("Token not Found", HttpStatus.UNAUTHORIZED);
    }
    try {
      const token = request.headers.authorization.split(" ")[1];

      const user = await admin.auth().verifyIdToken(token);

      if (!user) {
        throw new UnauthorizedException();
      }

      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
