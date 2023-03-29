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
  CreatePermissionTypeDTO,
  FilterPermissionTypeDTO,
  UpdatePermissionTypeDTO,
} from '../dtos';
import { PermissionType } from '../entities/permissionType.entity';
import { PermissionTypeService } from '../services/permissionType.service';

@ApiTags('PermissionType')
@ApiBearerAuth()
@Controller('permission-types')
export class PermissionTypeController {
  RELATIONS = [];
  constructor(private readonly service: PermissionTypeService) {}

  @Get()
  async findAll(
    @Query() query: FilterPermissionTypeDTO
  ): Promise<SuccessResponse | PermissionType[]> {
    return this.service.findAllBase(query, { relations: this.RELATIONS });
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<PermissionType> {
    return this.service.findByIdBase(id, { relations: this.RELATIONS });
  }

  @Post()
  async createOne(
    @Body() body: CreatePermissionTypeDTO
  ): Promise<PermissionType> {
    return this.service.createOneBase(body, { relations: this.RELATIONS });
  }

  //   @Post('recover/:id')
  //   async recoverById(@Param('id') id: string): Promise<PermissionType> {
  //     return this.service.recoverByIdBase(id, { relations: this.RELATIONS });
  //   }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() body: UpdatePermissionTypeDTO
  ): Promise<PermissionType> {
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
