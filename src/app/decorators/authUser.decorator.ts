import { IAuthUser } from '../interfaces/authUser.interface';
import { createParamDecorator } from '@nestjs/common';

export const AuthUser = createParamDecorator((data, req): IAuthUser => {
  return req.args[0].verifiedUser;
});
