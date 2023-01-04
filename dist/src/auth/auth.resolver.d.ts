import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { AuthResponse } from './types/auth-response.type';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginInput: LoginInput): Promise<AuthResponse>;
}
