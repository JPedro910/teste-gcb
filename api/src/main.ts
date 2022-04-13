import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Doctors Api')
    .setDescription('A doctors management API')
    .setVersion('1.0')
    .addTag('doctors')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documention', app, document);

  await app.listen(3333);
}
bootstrap();
