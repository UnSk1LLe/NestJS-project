import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
      UsersModule,
      JwtModule.register({
        secret: process.env.JWT_SECRET || 'a3h4w78g#4^1fds%&8f,as;',
        signOptions: {expiresIn: '24h'}
      })
  ],
  exports: [AuthService],
})
export class AuthModule {}
