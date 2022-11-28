import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LoginInput } from './dto/login.input';
import { AuthResponse } from './types/auth-response.type';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private logger = new Logger();

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    try {
      const user = await this.prisma.users.findUnique({
        where: { email: loginInput.email },
      });
      if (!user || !bcrypt.compareSync(loginInput.pass, user.pass))
        throw new UnauthorizedException();

      const tokenPayload: JwtPayload = {
        userId: user.id,
        typeId: user.typeId,
      };

      const token = this.jwtService.sign(tokenPayload);
      return { token, user };
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException();
    }
  }
}
