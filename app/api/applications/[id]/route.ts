import { prisma } from "@/prisma/globalPrismaClient";
import { Application } from "@prisma/client";
import { NextResponse } from "next/server";

interface ApiContextProps {
  params: { id: string };
}

export const GET = async (request: Request, context: ApiContextProps) => {
  const { id } = context.params;
  const result = await prisma.application.findFirst({
    where: {
      id,
    },
  });
  return NextResponse.json(result);
};

export const PUT = async (request: Request, context: ApiContextProps) => {
  const { id } = context.params;
  const { name, description, repositoryUrl }: Partial<Application> =
    await request.json();
  const result = await prisma.application.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      repositoryUrl,
      updatedAt: new Date(),
    },
  });
  return NextResponse.json(result);
};

export const DELETE = async (request: Request, context: ApiContextProps) => {
  const { id } = context.params;
  const result = await prisma.application.delete({
    where: {
      id,
    },
  });
  return NextResponse.json({ message: "deleted" });
};
