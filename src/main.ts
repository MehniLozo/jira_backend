import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
/*
const session = require('express-session');

import { getRepository } from 'typeorm';
import { Session } from './session/session';
import { TypeormStore } from 'connect-typeorm';
import { Repository } from 'typeorm';
*/

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  // const sessionRepository = getRepository(Session);
  /*
  app.use(
    session({
      name: process.env.SESSION_NAME,
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
      // store: new TypeormStore().connect(sessionRepository)
    }),
  );
    */
  const options = new DocumentBuilder()
    .setTitle('Jira API')
    .setDescription('Backend API')
    .setVersion('1.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}

bootstrap();
