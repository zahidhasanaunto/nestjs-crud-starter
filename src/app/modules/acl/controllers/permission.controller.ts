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
  CreatePermissionDTO,
  FilterPermissionDTO,
  UpdatePermissionDTO,
} from '../dtos';
import { Permission } from '../entities/permission.entity';
import { PermissionService } from '../services/permission.service';

@ApiTags('Permission')
@ApiBearerAuth()
@Controller('permissions')
export class PermissionController {
  RELATIONS = ['permissionType'];
  constructor(private readonly service: PermissionService) {}

  @Get()
  async findAll(
    @Query() query: FilterPermissionDTO
  ): Promise<SuccessResponse | Permission[]> {
    return this.service.findAllBase(query, { relations: this.RELATIONS });
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Permission> {
    return this.service.findByIdBase(id, { relations: this.RELATIONS });
  }

  @Post()
  async createOne(@Body() body: CreatePermissionDTO): Promise<Permission> {
    return this.service.createOneBase(body, { relations: this.RELATIONS });
  }

  //   @Post('recover/:id')
  //   async recoverById(@Param('id') id: string): Promise<Permission> {
  //     return this.service.recoverByIdBase(id, { relations: this.RELATIONS });
  //   }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() body: UpdatePermissionDTO
  ): Promise<Permission> {
    return this.service.updateOneBase(id, body, { relations: this.RELATIONS });
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<SuccessResponse> {
    return this.service.deleteOneBase(id);
  }

  //   @Delete('soft/:id')
  //   async softDeleteOne(@Param('id') id: string): Promise<SuccessResponse> {
  //     return this.service.softDeleteOneBase(id);
  //   }
}
