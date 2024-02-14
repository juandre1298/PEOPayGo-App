import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from './users.dto';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async getUsers() {
    return await prisma.user.findMany();
  }

  async getUserById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(data: CreateUserDto) {
    return await prisma.user.create({ data });
  }

  async updateUser(id: number, data: UpdateUserDto) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await prisma.user.delete({
      where: { id },
    });
  }
}
