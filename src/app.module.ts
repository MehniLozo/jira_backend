import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { IssueModule } from './issue/issue.module';
import { CommentModule } from './comment/comment.module';
import { RouterMod } from './router.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    EventEmitterModule.forRoot(),
    UserModule,
    ProjectModule,
    IssueModule,
    CommentModule,
    RouterMod,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
