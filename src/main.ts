import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'https://hyperhireui.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });
  const PORT = process.env.PORT ?? 3000;
  await app.listen(PORT);
  console.log('TEST', process.env.TEST);
  console.info('Info: Application running on PORT', PORT);
}
bootstrap();
