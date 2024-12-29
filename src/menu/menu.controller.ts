import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async getMenus() {
    return this.menuService.getMenus();
  }

   @Get('tree/:id')
  async getMenuTree(@Param('id') id: string) {
    return this.menuService.getMenuTree(id);
  }

  @Get(':id')
  async getMenuById(@Param('id') id: string) {
    return this.menuService.getMenuById(id);
  }

  @Post()
  async addMenu(@Body() body: { name: string; parentId: string | null }) {
    return this.menuService.addMenu(body.name, body.parentId);
  }

  @Put(':id')
  async updateMenu(@Param('id') id: string, @Body() body: { name: string }) {
    return this.menuService.updateMenu(id, body.name);
  }

  @Delete(':id')
  async deleteMenu(@Param('id') id: string) {
    return this.menuService.deleteMenu(id);
  }
}
