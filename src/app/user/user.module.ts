import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/utils/jwt.strategy';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: "JWT_SECRET",
          signOptions: {
            expiresIn: "3d",
          },
        };
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  
  controllers: [UserController],
  providers: [UserService,JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class UserModule {}
