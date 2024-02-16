import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service'; // Import AuthService
import { PrismaService } from '../prisma/prisma.service'; // Import PrismaService (assuming this is the name of your Prisma service)

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            // Mock AuthService methods here if needed
          },
        },
        {
          provide: PrismaService,
          useValue: {
            // Mock PrismaService methods here if needed
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
