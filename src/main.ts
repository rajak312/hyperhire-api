import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);
  app.use(
    cors({
      origin: ['http://localhost:3000', 'https://hyperhireui.vercel.app/'],
    }),
  );
  const PORT = process.env.PORT ?? 3000;
  await app.listen(PORT);
  console.info('Info: Application running on PORT', PORT);
}
bootstrap();
