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
import { PayrollController } from './payroll/payroll.controller';
import { PayrollService } from './payroll/payroll.service';
import { PayrollModule } from './payroll/payroll.module';

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
    PayrollModule,
  ],
  controllers: [AppController, AuthController, PayrollController],
  providers: [AppService, AuthService, PayrollService],
})
export class AppModule {}
