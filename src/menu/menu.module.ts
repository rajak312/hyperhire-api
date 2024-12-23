import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [],
  controllers: [MenuController],
  providers: [MenuService, PrismaClient],
})
export class MenuModule {}
