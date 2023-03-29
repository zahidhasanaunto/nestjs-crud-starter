import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDTO } from '../dtos';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@ApiTags('User')
@ApiBearerAuth()
@Controller('web/users')
export class WebUserController {
  constructor(private readonly service: UserService) {}

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return this.service.findByIdBase(id);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() body: UpdateUserDTO
  ): Promise<User> {
    return this.service.updateOneBase(id, body);
  }
}
