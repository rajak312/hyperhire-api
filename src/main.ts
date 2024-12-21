import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);
  const PORT = process.env.PORT ?? 3000;
  await app.listen(PORT);
  console.info('Info: Application running on PORT', PORT);
}
bootstrap();
