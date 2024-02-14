import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return await this.usersService.getUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.getUserById(parseInt(id, 10));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    if (
      !createUserDto.email ||
      !createUserDto.first_name ||
      !createUserDto.last_name ||
      !createUserDto.password ||
      !createUserDto.type
    ) {
      throw new HttpException(
        'Missing required fields',
        HttpStatus.BAD_REQUEST
      );
    }
    try {
      return await this.usersService.createUser(createUserDto);
    } catch (error) {
      if (error.message === 'Email is already in use') {
        throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersService.updateUser(
      parseInt(id, 10),
      updateUserDto
    );
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedUser = await this.usersService.deleteUser(parseInt(id, 10));
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return deletedUser;
  }
}
