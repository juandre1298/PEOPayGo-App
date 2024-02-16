import { Controller, Get, UseGuards } from '@nestjs/common';

import { TimesheetService } from './timesheet.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('timesheet')
export class TimesheetController {
  constructor(private readonly timesheetService: TimesheetService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.timesheetService.getAllTimesheets();
  }
}
