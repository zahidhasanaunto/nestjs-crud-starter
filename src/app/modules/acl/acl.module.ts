import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionController } from './controllers/permission.controller';
import { PermissionTypeController } from './controllers/permissionType.controller';
import { RoleController } from './controllers/role.controller';
import { Permission } from './entities/permission.entity';
import { PermissionType } from './entities/permissionType.entity';
import { Role } from './entities/role.entity';
import { RolePermission } from './entities/rolePermission.entity';
import { PermissionService } from './services/permission.service';
import { PermissionTypeService } from './services/permissionType.service';
import { RoleService } from './services/role.service';
import { RolePermissionService } from './services/rolePermission.service';

const entities = [Role, Permission, PermissionType, RolePermission];
const services = [
  RoleService,
  PermissionService,
  PermissionTypeService,
  RolePermissionService,
];
const subscribers = [];
const controllers = [
  RoleController,
  PermissionController,
  PermissionTypeController,
];

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [...services, ...subscribers],
  exports: [...services, ...subscribers],
  controllers: [...controllers],
})
export class AclModule {}
