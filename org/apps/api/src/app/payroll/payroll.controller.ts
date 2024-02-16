import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FormData } from './payroll.dto';

@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: FormData) {
    console.log(data);
    if (
      !data.employeeName ||
      !data.userId ||
      !data.payType ||
      !data.hours ||
      !data.weeksReporting ||
      !data.startDate ||
      !data.finalDate ||
      !data.grossWage ||
      !data.payRate
    ) {
      throw new HttpException(
        'Missing required fields',
        HttpStatus.BAD_REQUEST
      );
    }
    try {
      return await this.payrollService.createReport(data);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
