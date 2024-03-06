import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TinifyService } from '../tinify/tinify.service';

@Module({
  providers: [UserService, TinifyService],
  controllers: [UserController],
})
export class UserModule {}
