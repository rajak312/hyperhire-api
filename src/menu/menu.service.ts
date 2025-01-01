import { Injectable } from '@nestjs/common';
import { PrismaClient, Menu } from '@prisma/client';

@Injectable()
export class MenuService {
  private prisma = new PrismaClient();

  async getMenus(): Promise<Menu[]> {
    return await this.prisma.menu.findMany();
  }

  async getMenusTree(): Promise<Menu[]> {
    return await this.fetchMenusWithChildren();
  }

  async getMenuTree(id: string): Promise<Menu | null> {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: {
        children: true,
      },
    });

    if (!menu) {
      return null;
    }

    menu.children = await this.fetchMenusWithChildren(menu.id);

    return menu;
  }

  async getMenuById(id: string): Promise<Menu | null> {
    return await this.prisma.menu.findUnique({
      where: { id },
      include: {
        children: {
          include: {
            children: true,
          },
        },
      },
    });
  }

  async addMenu(name: string, parentId: string | null): Promise<Menu> {
    let menu;
    if (parentId)
      menu = await this.prisma.menu.findUnique({
        where: { id: parentId },
      });
    const data = await this.prisma.menu.create({
      data: {
        name,
        depth: (menu?.depth || 0) + 1,
        parentId,
      },
    });
    return data;
  }

  async updateMenu(id: string, name: string): Promise<Menu> {
    return await this.prisma.menu.update({
      where: { id },
      data: { name },
    });
  }

  async deleteMenu(id: string): Promise<Menu> {
    return await this.prisma.menu.delete({
      where: { id },
    });
  }

  private async fetchMenusWithChildren(
    parentId: string | null = null,
  ): Promise<Menu[]> {
    const menus = await this.prisma.menu.findMany({
      where: { parentId },
      include: {
        children: true,
      },
    });

    for (const menu of menus) {
      if (menu.children.length > 0) {
        menu.children = await this.fetchMenusWithChildren(menu.id);
      }
    }

    return menus;
  }
}
