import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JWTHelper } from '../helpers';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtHelper: JWTHelper) {}
  async use(req: any, res: Response, next: Function) {
    const token = this.jwtHelper.extractToken(req.headers);
    const verifiedUser: any = await this.jwtHelper.verify(token);

    if (!verifiedUser) {
      throw new UnauthorizedException('Unauthorized Access Detected');
    }

    req.verifiedUser = verifiedUser.user;

    next();
  }
}
