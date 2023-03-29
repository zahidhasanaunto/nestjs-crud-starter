import { UserRole } from './entities/userRole.entity';
import { UserRoleService } from './services/userRole.service';
import { AclModule } from './../acl/acl.module';
import { UserSubscriber } from './subscribers/user.subscriber';
import { HelpersModule } from './../../helpers/helpers.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { WebUserController } from './controllers/user.web.controller';

const entities = [User, UserRole];
const services = [UserService, UserRoleService];
const subscribers = [UserSubscriber];
const controllers = [UserController];
const webControllers = [WebUserController];
const modules = [HelpersModule, AclModule];

@Module({
  imports: [TypeOrmModule.forFeature(entities), ...modules],
  providers: [...services, ...subscribers],
  exports: [...services, ...subscribers],
  controllers: [...controllers, ...webControllers],
})
export class UserModule {}
