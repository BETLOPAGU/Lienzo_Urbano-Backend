import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserTypes } from 'src/users/enums/user-types.enum';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

export const Jwt = createParamDecorator(
  (validUserTypes: UserTypes[] = [], context: ExecutionContext) => {
    const jwtService = new JwtService();
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    const jwt: JwtPayload =
      req.user || jwtService.decode(req.Authorization.replace('Bearer ', ''));

    if (!jwt) {
      throw new InternalServerErrorException(`No jwt inside the request`);
    }

    if (validUserTypes.length === 0) return jwt;

    const valid = validUserTypes.some((userType) => userType === jwt.typeId);
    if (!valid) throw new UnauthorizedException();

    return jwt;
  },
);
