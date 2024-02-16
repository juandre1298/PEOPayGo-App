import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from './../prisma/prisma.service'; // Import PrismaService
import { JwtService } from '@nestjs/jwt'; // Import JwtService
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

// Mock PrismaService
class MockPrismaService {
  async user() {
    // Mock the user method if necessary
  }
}

// Mock JwtService
class MockJwtService {
  sign(payload: any) {
    // Mock the sign method if necessary
    return 'mockedToken';
  }
}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useClass: MockPrismaService }, // Provide mocked PrismaService
        { provide: JwtService, useClass: MockJwtService }, // Provide mocked JwtService
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
