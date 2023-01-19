import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as http from 'http';
import * as https from 'https';
const fs = require('fs-extra');
const tls = require('tls');
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(
    AppModule ,
    new ExpressAdapter(server),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('WTX Challenge')
    .setDescription('WTX Challenge API description')
    .setVersion('1.0')
    .addTag('wtxchallenge')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  if(process.env.NODE_ENV && process.env.NODE_ENV == 'production') {
    const httpsOptions = { // add httpd certificates for production
      key: fs.readFileSync(<string>process.env.key_path),
      cert: fs.readFileSync(<string>process.env.cert_path),
    };
    http.createServer(server).listen(Number(process.env.bind_port_http) ,  process.env.bind_ip);
    https.createServer(httpsOptions, server).listen(Number(process.env.bind_port_https), process.env.bind_ip);
  } else {
    await app.listen(3000);

  }
}

bootstrap();
