import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { Context } from '../context';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async getUsers(ctx?: Context) {
    try {
      if (ctx) {
        return await ctx.prisma.user.findMany();
      } else {
        return await prisma.user.findMany();
      }
    } catch (error) {
      console.log(error.message);
      throw error; //
    }
  }

  async getUserById(id: number, ctx?: Context) {
    try {
      const user = ctx
        ? await ctx.prisma.user.findUnique({
            where: { id },
          })
        : await prisma.user.findUnique({
            where: { id },
          });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      console.log(error.message);
      throw error; //
    }
  }

  async createUser(data: CreateUserDto, ctx?: Context) {
    try {
      const createdUser = ctx
        ? await ctx.prisma.user.create({ data })
        : await prisma.user.create({ data });
      return createdUser;
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

  async updateUser(id: number, data: UpdateUserDto, ctx?: Context) {
    const prismaCxt = ctx ? ctx.prisma : prisma;
    const user = await prismaCxt.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await prismaCxt.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number, ctx?: Context) {
    const prismaCxt = ctx ? ctx.prisma : prisma;
    const user = await prismaCxt.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await prismaCxt.user.delete({
      where: { id },
    });
  }
}
