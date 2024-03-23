import { CustomErrorReporter } from "@/app/validator/CustomErrorReporter";
import { loginSchema } from "@/app/validator/authSchema";
import { prisma } from "@/db/db.config";
import { User } from "@prisma/client";
import vine, { errors } from "@vinejs/vine";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

  vine.errorReporter = () => new CustomErrorReporter();
  const validator = vine.compile(loginSchema);
  const output = await validator.validate(data);

  // check if user i exist

  const user: User | null = await prisma.user.findUnique({
    where: {
      email: output.email,
    },
  });

  if (user == null) {
    return NextResponse.json({
      status: 400,
      errors: { email: "Invalid Crendials" },
    });
  }

  const comparedPassword = await bcrypt.compare(
    output.password,
    user.password!
  );
  if (comparedPassword) {
    return NextResponse.json({
      status: 200,
      message: "User login successfully",
    });
  }
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
        return NextResponse.json({ status: 400, errors: error.messages });
      }
  }
}
