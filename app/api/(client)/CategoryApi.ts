import { Category } from "@prisma/client";

//read all
export async function getCategories() {
  const result = await fetch("/api/categories");
  return (await result.json()) as Category[];
}
