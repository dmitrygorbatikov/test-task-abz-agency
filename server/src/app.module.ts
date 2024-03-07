import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PositionModule } from './modules/position/position.module';
import { TinifyModule } from './modules/tinify/tinify.module';
import { TokenModule } from './modules/token/token.module';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthCheckModule } from './modules/health-check';
import {PrismaModule} from "./modules/prisma/prisma.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    PrismaModule,
    PositionModule,
    TinifyModule,
    TokenModule,
    HealthCheckModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
