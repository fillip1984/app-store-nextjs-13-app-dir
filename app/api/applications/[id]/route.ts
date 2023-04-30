import { prisma } from "@/prisma/globalPrismaClient";
import { Application } from "@prisma/client";
import { NextResponse } from "next/server";

interface ContextProps {
  params: { id: string };
}

export const GET = async (request: Request, context: ContextProps) => {
  console.log("context", context);
  const id = "0";
  const result = await prisma.application.findFirst({
    where: {
      id,
    },
  });
  return NextResponse.json(result);
};

export const PUT = async (request: Request, context: ContextProps) => {
  const { name, description }: Partial<Application> = await request.json();
  console.log("context", context);
  const id = "0";
  const result = await prisma.application.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      updatedAt: new Date(),
    },
  });
  return NextResponse.json(result);
};

export const DELETE = async (request: Request, context: ContextProps) => {
  const { id } = context.params;
  const result = await prisma.application.delete({
    where: {
      id,
    },
  });
  return NextResponse.json({ message: "deleted" });
};
