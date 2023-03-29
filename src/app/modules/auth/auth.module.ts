import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelpersModule } from '../../helpers/helpers.module';
import { AclModule } from './../acl/acl.module';
import { UserModule } from './../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { WebAuthController } from './controllers/auth.web.controller';
import { AuthStat } from './entities/authStat.entity';
import { AuthService } from './services/auth.service';
import { AuthStatService } from './services/authStat.service';

const entities = [AuthStat];
const services = [AuthStatService, AuthService];
const subscribers = [];
const controllers = [AuthController];
const webControllers = [WebAuthController];
const modules = [HelpersModule, UserModule, AclModule];

@Module({
  imports: [TypeOrmModule.forFeature(entities), ...modules],
  providers: [...services, ...subscribers],
  exports: [...services, ...subscribers],
  controllers: [...controllers, ...webControllers],
})
export class AuthModule {}
