import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from '@src/app/types';
import {
  CreateRoleDTO,
  FilterPermissionDTO,
  FilterRoleDTO,
  RemovePermissionsDTO,
  UpdateRoleDTO,
} from '../dtos';
import { Permission } from '../entities/permission.entity';
import { Role } from '../entities/role.entity';
import { RoleService } from '../services/role.service';
import { AddPermissionsDTO } from './../dtos/role/addPermissions.dto';

@ApiTags('Role')
@ApiBearerAuth()
@Controller('roles')
export class RoleController {
  RELATIONS = [];
  constructor(private readonly service: RoleService) {}

  @Get()
  async findAll(
    @Query() query: FilterRoleDTO
  ): Promise<SuccessResponse | Role[]> {
    return this.service.findAllBase(query, { relations: this.RELATIONS });
  }

  @Get(':id/available-permissions')
  async availablePermissions(
    @Param('id') id: string,
    @Query() query: FilterPermissionDTO
  ): Promise<Permission[]> {
    return this.service.availablePermissions(id, query);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Role> {
    return this.service.findByIdBase(id, { relations: this.RELATIONS });
  }

  @Post()
  async createOne(@Body() body: CreateRoleDTO): Promise<Role> {
    return this.service.createOneBase(body, { relations: this.RELATIONS });
  }

  @Post(':id/add-permissions')
  async addPermission(
    @Param('id') id: string,
    @Body() body: AddPermissionsDTO
  ): Promise<Permission[]> {
    return this.service.addPermissions(id, body);
  }

  //   @Post('recover/:id')
  //   async recoverById(@Param('id') id: string): Promise<Role> {
  //     return this.service.recoverByIdBase(id, { relations: this.RELATIONS });
  //   }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() body: UpdateRoleDTO
  ): Promise<Role> {
    return this.service.updateOneBase(id, body, { relations: this.RELATIONS });
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<SuccessResponse> {
    return this.service.deleteOneBase(id);
  }

  @Delete(':id/remove-permissions')
  async removePermission(
    @Param('id') id: string,
    @Body() body: RemovePermissionsDTO
  ): Promise<Permission[]> {
    return this.service.removePermissions(id, body);
  }

  //   @Delete('soft/:id')
  //   async softDeleteOne(@Param('id') id: string): Promise<SuccessResponse> {
  //     return this.service.softDeleteOneBase(id);
  //   }
}
