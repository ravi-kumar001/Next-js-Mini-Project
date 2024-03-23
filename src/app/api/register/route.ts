import { registerSchema } from "@/app/validator/authSchema";
import vine, { errors } from "@vinejs/vine";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/db/db.config";
import { User } from "@prisma/client";
import { CustomErrorReporter } from "@/app/validator/CustomErrorReporter";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    vine.errorReporter = () => new CustomErrorReporter();
    const validator = vine.compile(registerSchema);
    const output = await validator.validate(data);

    //check if password be unique
    const user: User | null = await prisma.user.findUnique({
      where: {
        email: output.email,
      },
    });

    // Hash the password
    const hashedPassword = await bcrypt.hash(output.password, 10);
    output.password = hashedPassword;

    if (user) {
      return NextResponse.json({
        status: 400,
        errors: {
          email: "Email already taken",
        },
      });
    }

    // create user
    await prisma.user.create({
      data: output,
    });
    return NextResponse.json({
      status: 200,
      message: "User created successfully.",
    });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json({ status: 400, errors: error.messages });
    }
  }
}
