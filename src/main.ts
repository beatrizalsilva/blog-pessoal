import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.TZ = '-03:00'; //configura o fuso-horário

  app.useGlobalPipes(new ValidationPipe()); //checará todas as requisições
  app.enableCors(); //permite receber requicisão http de outras origens
  await app.listen(4000);
}
bootstrap();
