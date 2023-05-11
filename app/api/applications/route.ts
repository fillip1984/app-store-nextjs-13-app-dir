import { prisma } from "@/prisma/globalPrismaClient";
import { Application } from "@prisma/client";
import { NextResponse } from "next/server";

export async function getOrCreateUncategorized() {
  let uncategorized = await prisma.category.findFirst({
    where: {
      name: "Uncategorized",
    },
  });
  if (uncategorized) return uncategorized;

  uncategorized = await prisma.category.create({
    data: {
      name: "Uncategorized",
      description: "Uncategorized application",
    },
  });

  return uncategorized;
}

export async function POST(request: Request) {
  const { name }: Partial<Application> = await request.json();

  if (!name) return NextResponse.json({ message: "Missing required data" });

  const uncategorized = await getOrCreateUncategorized();

  const result = await prisma.application.create({
    data: {
      name,
      description: "Add a description to help describe the application",
      category: {
        connect: {
          id: uncategorized.id,
        },
      },
      status: "BACKLOG",
    },
  });
  return NextResponse.json(result);
}

export async function GET() {
  const result = await prisma.application.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });
  return NextResponse.json(result);
}

export async function DELETE() {
  console.log("deleting all apps");
  const result = await prisma.application.deleteMany({});
  console.log("deleted all apps, %s apps deleted", result.count);
  return NextResponse.json(result);
}
