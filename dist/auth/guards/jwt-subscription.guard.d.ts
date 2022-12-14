import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
export declare class CatsGuard implements CanActivate {
    readonly jwtService: JwtService;
    constructor(jwtService: JwtService);
    canActivate(context: ExecutionContext): boolean;
}
