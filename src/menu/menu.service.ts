import { Injectable } from '@nestjs/common';
import { PrismaClient, Menu } from '@prisma/client';

@Injectable()
export class MenuService {
  private prisma = new PrismaClient();

  // Fetch all menus hierarchically
  async getMenus(): Promise<Menu[]> {
    return await this.prisma.menu.findMany({
      where: { parentId: null }, // Start from root menus
      include: {
        children: {
          include: {
            children: true, // Recursively fetch children
          },
        },
      },
    });
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
    const menu = await this.prisma.menu.findUnique({
      where: { id: parentId },
    });
    if (!menu) return;
    return await this.prisma.menu.create({
      data: {
        name,
        depth: menu?.depth + 1,
        parentId,
      },
    });
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
}
