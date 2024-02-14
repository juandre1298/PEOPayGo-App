import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';
// import { USERS } from './users.mock';

describe('UsersController', () => {
  let controller: UsersController;

  // creating fake dependencies in order to insolate the controller function
  // using a NestJS build-in dependny injection mechainsm

  const mockUserService = {
    getUsers: jest.fn(() => {
      return [
        {
          id: Date.now(),
          email: 'test1@test1.com',
          first_name: 'test1',
          last_name: 'test1',
          password: '123456',
          type: 'admin',
        },
        {
          id: Date.now() + 1,
          email: 'test1@test1.com',
          first_name: 'test1',
          last_name: 'test1',
          password: '123456',
          type: 'admin',
        },
      ];
    }),
    getUserById: jest.fn(() => {
      return {
        id: 1,
        email: 'test1@test1.com',
        first_name: 'test1',
        last_name: 'test1',
        password: '123456',
        type: 'admin',
      };
    }),
    createUser: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    updateUser: jest.fn((id, dto) => ({
      id,
      ...dto,
    })),
    deleteUser: jest.fn(() => {
      return {
        id: 1,
        email: 'test1@test1.com',
        first_name: 'test1',
        last_name: 'test1',
        password: '123456',
        type: 'admin',
      };
    }),
  };

  // change the dependendices and compile
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });
  // check if defined
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // check if it can get all users
  it('should get all users', async () => {
    const dto: CreateUserDto = {
      email: 'test1@test1.com',
      first_name: 'test1',
      last_name: 'test1',
      password: '123456',
      type: 'admin',
    };

    const allUser = await controller.findAll();

    expect(allUser).toEqual([
      {
        // Now check the resolved value

        id: expect.any(Number),
        ...dto,
      },
      {
        // Now check the resolved value

        id: expect.any(Number),
        ...dto,
      },
    ]);
  });

  // check if it can get one user
  it('should get one user', async () => {
    const dto: CreateUserDto = {
      email: 'test1@test1.com',
      first_name: 'test1',
      last_name: 'test1',
      password: '123456',
      type: 'admin',
    };

    const user = await controller.findOne('1');

    expect(user).toEqual({
      // Now check the resolved value

      id: expect.any(Number),
      ...dto,
    });
  });

  // check if can create a user
  it('should create a user ', async () => {
    const dto: CreateUserDto = {
      email: 'test1@test1.com',
      first_name: 'test1',
      last_name: 'test1',
      password: '123456',
      type: 'admin',
    };

    const createdUser = await controller.create(dto);

    expect(createdUser).toEqual({
      // Now check the resolved value

      id: expect.any(Number),
      ...dto,
    });
  });
  // check if it can update user
  it('should update the user', async () => {
    const dto: UpdateUserDto = {
      email: 'test2@test2.com',
      first_name: 'test2',
      last_name: 'test2',
      password: '1234567',
      type: 'customer',
    };
    const updatedUser = await controller.update('1', dto);
    expect(updatedUser).toEqual({ id: 1, ...dto });
  });
  // it should delete a user

  it('should delete a user', async () => {
    const dto: CreateUserDto = {
      email: 'test1@test1.com',
      first_name: 'test1',
      last_name: 'test1',
      password: '123456',
      type: 'admin',
    };

    const user = await controller.remove('1');

    expect(user).toEqual({
      // Now check the resolved value

      id: expect.any(Number),
      ...dto,
    });
  });
});
