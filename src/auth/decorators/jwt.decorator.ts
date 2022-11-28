import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserTypes } from 'src/users/enums/user-types.enum';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

export const Jwt = createParamDecorator(
  (validUserTypes: UserTypes[] = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const jwt: JwtPayload = ctx.getContext().req.user;

    if (!jwt) {
      throw new InternalServerErrorException(`No jwt inside the request`);
    }

    if (validUserTypes.length === 0) return jwt;

    const valid = validUserTypes.some((userType) => userType === jwt.typeId);
    if (!valid) throw new UnauthorizedException();

    return jwt;
  },
);
