import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../dto/auth.dto';
import { Request } from 'express';

export const GetPatient = createParamDecorator(
  (key: keyof Omit<JwtPayload, 'facilityId'>, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return key ? request.user[key] : request.user;
  },
);
