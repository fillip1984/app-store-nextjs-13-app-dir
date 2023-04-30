import { prisma } from "@/prisma/globalPrismaClient";
import { Application } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(context: any) {
  console.log("context", context);
  const id = "0";
  const result = await prisma.application.findFirst({
    where: {
      id,
    },
  });
  return NextResponse.json(result);
}

export async function PUT(request: Request, context: any) {
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
}

export async function DELETE(context: any) {
  console.log("context", context);

  const id = "0";
  const result = await prisma.application.delete({
    where: {
      id,
    },
  });
  return NextResponse.json({ message: "deleted" });
}