import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TimesheetModule } from './timesheet/timesheet.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { jwtSecret } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    TimesheetModule,
    AuthModule,
    PrismaModule,
    JwtModule.register({
      secret: jwtSecret, // Replace with your actual secret key
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
