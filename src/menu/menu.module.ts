import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  imports: [],
  controllers: [MenuController],
  providers: [MenuService, PrismaClient],
})
export class MenuModule {}
