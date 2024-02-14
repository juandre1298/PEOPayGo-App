import { MockContext, Context, createMockContext } from '../context';
import { UsersService } from './users.service';
import { CreateUserDto } from './users.dto';
import { User as UserType } from './users.dto';

let mockCtx: MockContext;
let ctx: Context;
let service: UsersService; // Initialize service variable

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
  service = new UsersService(); // Instantiate UsersService
});

test('should get all users ', async () => {
  const dto: CreateUserDto = {
    email: 'test1@test1.com',
    first_name: 'test1',
    last_name: 'test1',
    password: '123456',
    type: 'admin',
  };
  const mockUserCreateResponse: UserType = {
    id: 1,
    email: dto.email,
    first_name: dto.first_name,
    last_name: dto.last_name,
    password: dto.password,
    type: dto.type,
  };

  mockCtx.prisma.user.findMany.mockResolvedValue([mockUserCreateResponse]);

  await expect(service.getUsers(ctx)).resolves.toEqual([
    {
      id: expect.any(Number),
      ...dto,
    },
  ]);
});

test('should get a user by id', async () => {
  const dto: CreateUserDto = {
    email: 'test1@test1.com',
    first_name: 'test1',
    last_name: 'test1',
    password: '123456',
    type: 'admin',
  };
  const mockUserCreateResponse: UserType = {
    id: 1,
    email: dto.email,
    first_name: dto.first_name,
    last_name: dto.last_name,
    password: dto.password,
    type: dto.type,
  };

  mockCtx.prisma.user.findUnique.mockResolvedValue(mockUserCreateResponse);

  await expect(service.getUserById(1, ctx)).resolves.toEqual({
    id: expect.any(Number),
    ...dto,
  });
});

test('should create new user ', async () => {
  const dto: CreateUserDto = {
    email: 'test1@test1.com',
    first_name: 'test1',
    last_name: 'test1',
    password: '123456',
    type: 'admin',
  };
  const mockUserCreateResponse: UserType = {
    id: 1,
    email: dto.email,
    first_name: dto.first_name,
    last_name: dto.last_name,
    password: dto.password,
    type: dto.type,
  };

  mockCtx.prisma.user.create.mockResolvedValue(mockUserCreateResponse);

  await expect(service.createUser(dto, ctx)).resolves.toEqual({
    id: expect.any(Number),
    ...dto,
  });
});

test('should update a user ', async () => {
  const dto: CreateUserDto = {
    email: 'test1@test1.com',
    first_name: 'test1',
    last_name: 'test1',
    password: '123456',
    type: 'admin',
  };
  const mockUserCreateResponse: UserType = {
    id: 1,
    email: dto.email,
    first_name: dto.first_name,
    last_name: dto.last_name,
    password: dto.password,
    type: dto.type,
  };

  mockCtx.prisma.user.findUnique.mockResolvedValue(mockUserCreateResponse);
  mockCtx.prisma.user.update.mockResolvedValue(mockUserCreateResponse);

  await expect(service.updateUser(1, dto, ctx)).resolves.toEqual({
    id: expect.any(Number),
    ...dto,
  });
});

test('should update a user ', async () => {
  const dto: CreateUserDto = {
    email: 'test1@test1.com',
    first_name: 'test1',
    last_name: 'test1',
    password: '123456',
    type: 'admin',
  };
  const mockUserCreateResponse: UserType = {
    id: 1,
    email: dto.email,
    first_name: dto.first_name,
    last_name: dto.last_name,
    password: dto.password,
    type: dto.type,
  };

  mockCtx.prisma.user.findUnique.mockResolvedValue(mockUserCreateResponse);
  mockCtx.prisma.user.update.mockResolvedValue(mockUserCreateResponse);

  await expect(service.updateUser(1, dto, ctx)).resolves.toEqual({
    id: expect.any(Number),
    ...dto,
  });
});

test('should delete a user ', async () => {
  const dto: CreateUserDto = {
    email: 'test1@test1.com',
    first_name: 'test1',
    last_name: 'test1',
    password: '123456',
    type: 'admin',
  };
  const mockUserCreateResponse: UserType = {
    id: 1,
    email: dto.email,
    first_name: dto.first_name,
    last_name: dto.last_name,
    password: dto.password,
    type: dto.type,
  };

  mockCtx.prisma.user.findUnique.mockResolvedValue(mockUserCreateResponse);
  mockCtx.prisma.user.delete.mockResolvedValue(mockUserCreateResponse);

  await expect(service.deleteUser(1, ctx)).resolves.toEqual({
    id: expect.any(Number),
    ...dto,
  });
});
