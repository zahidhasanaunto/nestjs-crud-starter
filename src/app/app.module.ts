import { CacheModule, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DatabaseModule } from '@src/database/database.module';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExceptionFilter } from './filters';
import { HelpersModule } from './helpers/helpers.module';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

const MODULES = [
  CacheModule.register({
    isGlobal: true,
  }),
  DatabaseModule,
  HelpersModule,
  ServeStaticModule.forRoot({
    rootPath: join(process.cwd(), 'uploads'),
  }),
  AuthModule,
  UserModule,
];
@Module({
  imports: [...MODULES],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },

    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
