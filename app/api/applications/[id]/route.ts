import { prisma } from "@/prisma/globalPrismaClient";
import { Application } from "@prisma/client";
import { NextResponse } from "next/server";

interface ApiContextProps {
  params: { id: string };
}

export async function GET(request: Request, context: ApiContextProps) {
  const { id } = context.params;
  const result = await prisma.application.findFirst({
    where: {
      id,
    },
  });
  return NextResponse.json(result);
}

export async function PUT(request: Request, context: ApiContextProps) {
  const { id } = context.params;
  const {
    name,
    description,
    repositoryUrl,
    status,
    categoryId,
  }: Partial<Application> = await request.json();
  const result = await prisma.application.update({
    where: {
      id,
    },
    data: {
      updatedAt: new Date(),
      name,
      description,
      repositoryUrl,
      status,
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
  });
  return NextResponse.json(result);
}

export async function DELETE(request: Request, context: ApiContextProps) {
  const { id } = context.params;
  const result = await prisma.application.delete({
    where: {
      id,
    },
  });
  return NextResponse.json({ message: "deleted" });
}
