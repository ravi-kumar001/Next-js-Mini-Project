import { prisma } from "@/db/db.config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const posts = await prisma.post.findMany({
    orderBy: {
      id: "desc",
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  return NextResponse.json({
    status: 200,
    message: "All Post find Successfully",
    data: posts,
  });
}
