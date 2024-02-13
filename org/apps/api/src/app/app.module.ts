import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TimesheetModule } from './timesheet/timesheet.module';

@Module({
  imports: [UsersModule, TimesheetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
