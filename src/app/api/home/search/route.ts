import { prisma } from "@/db/db.config";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // console.log(request.url); /* get nextjs url path name */
  const url = new URL(request.url); /* create js new url instance */
  const query = url.searchParams.get("query");

  /* find post data on the basis of query */

  const post = await prisma.post.findMany({
    where: {
      title: {
        contains: query ?? "",
      },
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  return NextResponse.json({ status: 200, data: post });
}
