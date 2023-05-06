import { prisma } from "@/prisma/globalPrismaClient";
import { Application } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name }: Partial<Application> = await request.json();

  if (!name) return NextResponse.json({ message: "Missing required data" });

  const result = await prisma.application.create({
    data: {
      name,
      description: "Add an application description",
    },
  });
  return NextResponse.json(result);
}

export async function GET() {
  const result = await prisma.application.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return NextResponse.json(result);
}

export async function DELETE() {
  console.log("deleting all apps");
  const result = await prisma.application.deleteMany({});
  console.log("deleted all apps, %s apps remain", result.count);
  return NextResponse.json(result);
}
