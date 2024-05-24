import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../dto/auth.dto';
import { Request } from 'express';

export const GetUser = createParamDecorator(
  (key: keyof JwtPayload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return key ? request.user[key] : request.user;
  },
);
