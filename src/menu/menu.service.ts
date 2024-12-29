import { Injectable } from '@nestjs/common';
import { PrismaClient, Menu } from '@prisma/client';

@Injectable()
export class MenuService {
  private prisma = new PrismaClient();

  // Fetch all menus hierarchically
  async getMenus(): Promise<Menu[]> {
    return await this.prisma.findMany()
  }

  async getMenusTree():Promise<Menu[]>{
      return await this.fetchMenusWithChildren();
  }


  async getMenuTree(id: string): Promise<Menu | null> {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: {
        children: true, // Fetch immediate children
      },
    });

    if (!menu) {
      return null;
    }

    // Recursively fetch children
    menu.children = await this.fetchMenusWithChildren(menu.id);

    return menu;
  }

  // Fetch a single menu with its children
  async getMenuById(id: string): Promise<Menu | null> {
    return await this.prisma.menu.findUnique({
      where: { id },
      include: {
        children: {
          include: {
            children: true, // Recursively fetch children
          },
        },
      },
    });
  }

  // Add a new menu item
  async addMenu(name: string, parentId: string | null): Promise<Menu> {
    let menu;
    if (parentId)
      menu = await this.prisma.menu.findUnique({
        where: { id: parentId },
      });
    console.log('menu added', menu);
    const data = await this.prisma.menu.create({
      data: {
        name,
        depth: (menu?.depth || 0) + 1,
        parentId,
      },
    });
    console.log('data', data);
    return data;
  }

  // Update an existing menu item
  async updateMenu(id: string, name: string): Promise<Menu> {
    return await this.prisma.menu.update({
      where: { id },
      data: { name },
    });
  }

  // Delete a menu item
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
