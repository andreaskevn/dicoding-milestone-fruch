import { NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(request: Request): Promise<Response> {
  try {
    const { first_name, last_name, email, password } = await request.json();

    if (!first_name || !last_name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash: hashedPassword,
        name: `${first_name} ${last_name}`,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _, ...result } = user;
    return NextResponse.json({ result }, { status: 201 });
  } catch (e) {
    console.error("Registration Error:", e);
    return NextResponse.json(
      { message: "Registration failed", error: (e as Error).message },
      { status: 500 }
    );
  }
}
