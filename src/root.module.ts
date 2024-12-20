import { Module } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [AppModule, MenuModule],
})
export class RootModule {}
