import {
  NestFactory,
  //  SerializedGraph
} from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    abortOnError: false,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true, // Stop validation at the first error
    }),
  );
  await app.listen(3000);
  // writeFileSync('./graph.json', app.get(SerializedGraph).toString());
}
bootstrap();
