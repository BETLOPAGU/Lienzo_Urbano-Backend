import { PrismaService } from 'src/prisma.service';
import { LoginInput } from './dto/login.input';
import { AuthResponse } from './types/auth-response.type';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private logger;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(loginInput: LoginInput): Promise<AuthResponse>;
}
