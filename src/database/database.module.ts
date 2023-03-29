import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from '@src/env';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig as any)],
})
export class DatabaseModule {}
