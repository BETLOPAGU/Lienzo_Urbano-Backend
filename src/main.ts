import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.APP_PORT);
  console.log(
    `🚀🎨 Lienzo Urbano server is ready on http://localhost:${process.env.APP_PORT}/graphql`,
  );
}
bootstrap();
