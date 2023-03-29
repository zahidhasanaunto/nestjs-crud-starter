import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@src/app/base';
import { Repository } from 'typeorm';
import { PermissionType } from '../entities/permissionType.entity';

@Injectable()
export class PermissionTypeService extends BaseService<PermissionType> {
  constructor(
    @InjectRepository(PermissionType)
    private readonly _repo: Repository<PermissionType>
  ) {
    super(_repo);
  }
}
