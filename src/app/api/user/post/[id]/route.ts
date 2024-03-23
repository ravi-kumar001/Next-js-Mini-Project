import {
  CustomSession,
  authOptions,
} from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/db/db.config";
import { rmSync } from "fs";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  /*  check if user is exist */

  try {
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ status: 400, message: "Unauthorized User" });
    }

    /* find post with id */

    const post = await prisma.post.findUnique({
      where: {
        id: Number(params.id),
      },
      select: {
        image: true,
        id: true,
      },
    });

    /* Delete from local Database */

    const relativeUploadDir = `/uploads`;
    const uploadDir = join(process.cwd(), "/public", relativeUploadDir);
    const path: string = uploadDir + "/" + post?.image;
    rmSync(path, { force: true });

    /* Delete from mysql Database */

    await prisma.post.delete({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json({
      status: 200,
      message: "Post Deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Something went wrong!" });
  }
}
