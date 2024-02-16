import { Injectable } from '@nestjs/common';
import { FormData } from './payroll.dto';
import { Prisma, PrismaClient, PayRate } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class PayrollService {
  async createReport(data: FormData) {
    try {
      const createDatasheet = await prisma.datasheet.create({
        data: {
          employeeName: data.employeeName,
          userId: parseInt(data.userId),
          payType: data.payType,
          hours: data.hours,
          weeksReporting: data.weeksReporting,
          startDate: new Date(data.startDate),
          finalDate: new Date(data.finalDate),
          note: data.note,
          grossWage: data.grossWage,
          payRate: data.payRate == 20 ? 'hourly' : 'salary',
        },
      });
      return createDatasheet;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        // P2002 error code indicates a unique constraint violation
        throw new Error('Email is already in use');
      } else {
        console.log(error.message);
        throw error; // re-throw any other errors
      }
    }
  }
}
