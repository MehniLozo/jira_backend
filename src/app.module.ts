import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { IssueModule } from './issue/issue.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
//import { APP_GUARD } from '@nestjs/core';
//import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AuthMiddleware } from './auth/auth.middleware';
import { ProjectController } from './project/project.controller';
import { UserController } from './user/user.controller';
import { IssueController } from './issue/issue.controller';
import { CommentController } from './comment/comment.controller';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    ProjectModule,
    IssueModule,
    CommentModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        //ProjectController,
        //UserController,
        //IssueController,
        //CommentController,
      );
  }
}
