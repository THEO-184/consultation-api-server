import { JwtPayload } from 'src/auth/dto/auth.dto';

declare module 'express' {
  interface Request {
    user: JwtPayload;
  }
}
