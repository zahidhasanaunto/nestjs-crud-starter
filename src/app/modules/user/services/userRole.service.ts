import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@src/app/base/base.service';
import { In, Repository } from 'typeorm';
import { Permission } from '../../acl/entities/permission.entity';
import { RolePermissionService } from '../../acl/services/rolePermission.service';
import { UserRole } from '../entities/userRole.entity';

@Injectable()
export class UserRoleService extends BaseService<UserRole> {
  constructor(
    @InjectRepository(UserRole)
    public readonly userRoleRepository: Repository<UserRole>,
    private readonly rolePermissionService: RolePermissionService
  ) {
    super(userRoleRepository);
  }

  async getUserPermissions(userId: string): Promise<string[]> {
    const userRoles = await this.find({
      where: {
        user: { id: userId },
      },
      relations: ['role'],
    });

    const roleIds = userRoles.map((uR) => uR.role.id);
    let permissions: string[] = [];

    if (roleIds.length) {
      const rolePermissions = await this.rolePermissionService.find({
        where: {
          role: {
            id: In(roleIds),
          },
        },
        relations: ['permission'],
      });

      permissions = rolePermissions.map((rP) => rP.permission.title);
    }

    return permissions;
  }
}
