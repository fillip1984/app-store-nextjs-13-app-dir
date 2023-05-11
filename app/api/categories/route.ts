import { prisma } from "@/prisma/globalPrismaClient";
import { NextResponse } from "next/server";
import React from "react";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return NextResponse.json(categories);
}
