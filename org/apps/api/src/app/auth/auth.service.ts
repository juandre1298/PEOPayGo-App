//src/auth/auth.service.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';
import { hashPassword } from '../utils/utils';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    // Step 1: Fetch a user with the given email
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const isPasswordValid = user.password === hashPassword(password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const token = {
      accessToken: this.jwtService.sign({
        userId: user.id,
        userType: user.type,
        userFirstName: user.first_name,
        userLastName: user.last_name,
        userEmail: user.email,
      }),
    };

    return token;
  }
}
