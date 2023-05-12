"use server";

import { Category } from "@prisma/client";
import { prisma } from "./prisma/globalPrismaClient";

export async function createCategory(category: Partial<Category>) {
  if (category.name)
    if (category.description)
      category = await prisma.category.create({
        data: {
          name: category.name,
          description: category.description,
        },
      });
  return category;
}

export async function getCategories() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return categories;
}

export async function getCategory(id: string) {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  return category;
}

export async function updateCategory(category: Partial<Category>) {
  category = await prisma.category.update({
    where: {
      id: category.id,
    },
    data: {
      updatedAt: new Date(),
      name: category.name,
      description: category.description,
    },
  });
  return category;
}

export async function deleteCategory(id: string) {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return true;
}

export async function deleteAllCategories() {
  const result = await prisma.category.deleteMany({});
  return true;
}
