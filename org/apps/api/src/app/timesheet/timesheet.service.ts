import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class TimesheetService {
  async getAllTimesheets() {
    try {
      return await prisma.datasheet.findMany();
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}
