import { CustomErrorReporter } from "@/app/validator/CustomErrorReporter";
import { postSchema } from "@/app/validator/authSchema";
import { ImageValidator } from "@/app/validator/imageValidator";
import { prisma } from "@/db/db.config";
import { getRandomNumber } from "@/lib/utils";
import vine, { errors } from "@vinejs/vine";
import { writeFile } from "fs/promises";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { CustomSession, authOptions } from "../../auth/[...nextauth]/options";

export async function GET(req: NextRequest) {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ status: 400, message: "Unauthorized User" });
  }
  const posts = await prisma.post.findMany({
    orderBy: {
      id: "desc",
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    where: {
      user_id: Number(session?.user?.id!),
    },
  });
  return NextResponse.json({ status: 200, data: posts });
}

export async function POST(req: NextRequest) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ status: 400, message: "Unauthorized User" });
    }

    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      image: file?.name,
      user_id: formData.get("user_id"),
    };

    /*  vine js validation  */
    vine.errorReporter = () => new CustomErrorReporter();
    const validator = vine.compile(postSchema);
    const output = await validator.validate(data);

    /* Image validation */
    const isNotValidImage = ImageValidator(file?.name, file?.size);
    if (isNotValidImage) {
      return NextResponse.json({
        status: 400,
        errors: {
          image: isNotValidImage,
        },
      });
    }

    /* Image Upload */

    try {
      const buffer = Buffer.from(await file!.arrayBuffer());
      const relativeUploadDir = `/uploads`;
      const uploadDir = join(process.cwd(), "/public", relativeUploadDir);

      const uniqueName = Date.now() + "_" + getRandomNumber(1, 99999);
      const imageExtension = file?.name.split(".");
      const imageName = uniqueName + "." + imageExtension?.[1];

      /* write our image file */
      await writeFile(`${uploadDir}/${imageName}`, buffer);

      await prisma.post.create({
        data: {
          title: output.title,
          description: output.description,
          user_id: Number(data.user_id),
          image: imageName,
        },
      });
      return NextResponse.json(
        { status: 200, message: "Post created successfully" }
      );
    } catch (error) {
      console.error("Error while trying to upload a file\n", error);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json({ status: 400, errors: error.messages });
    }
  }
}
