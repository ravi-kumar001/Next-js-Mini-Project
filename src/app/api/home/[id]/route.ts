import { prisma } from "@/db/db.config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: Number } }
) {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  return NextResponse.json({status : 200 , data : post})
}