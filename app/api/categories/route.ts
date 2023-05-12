import { prisma } from "@/prisma/globalPrismaClient";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return NextResponse.json(categories);
}

export async function DELETE() {
  const result = await prisma.category.deleteMany({});
  return NextResponse.json(result);
}
