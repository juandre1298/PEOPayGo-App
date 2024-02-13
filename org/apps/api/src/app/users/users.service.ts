import { Injectable } from '@nestjs/common';
import { USERS } from './users.mock';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class UsersService {
  //   private users = USERS;
  public async getUsers() {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  }
}
