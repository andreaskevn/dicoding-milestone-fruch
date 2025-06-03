// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import prisma from "@/lib/prisma";
// Impor tipe dari definisi Anda, pastikan path dan nama tipe sesuai
import type {
  LoginApiResponse,
  UserSafeData,
  LoginFormState,
} from "@/lib/definition";

export async function POST(
  request: Request
): Promise<NextResponse<LoginApiResponse>> {
  // Menggunakan NextResponse dan LoginApiResponse
  try {
    const body: LoginFormState = await request.json(); // Memberi tipe pada body
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email dan password wajib diisi", error: "Bad Request" }, // Menambahkan field error
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Email atau password salah", error: "Unauthorized" }, // Menambahkan field error
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Email atau password salah", error: "Unauthorized" }, // Menambahkan field error
        { status: 401 }
      );
    }

    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

    if (!jwtSecret) {
      console.error("JWT_SECRET tidak ditemukan di environment variables.");
      return NextResponse.json(
        {
          message: "Kesalahan konfigurasi server",
          error: "Internal Server Error",
        }, // Menambahkan field error
        { status: 500 }
      );
    }

    const payload = {
      userId: user.id,
      email: user.email,
    };

    // Menggunakan SignOptions secara eksplisit
    const signOptions: SignOptions = {
      // Hapus type assertion 'as jwt.StringValue' karena tidak diperlukan dan menyebabkan error
      expiresIn: jwtExpiresIn,
      // algorithm: 'HS256' // Anda bisa biarkan ini dikomentari jika HS256 adalah default yang diinginkan
    };

    const token = jwt.sign(payload, jwtSecret, signOptions);

    console.log("Token:", token);

    const { passwordHash, ...userWithoutPassword } = user;

    // Memastikan objek user yang dikembalikan sesuai dengan UserSafeData
    const responseUser: UserSafeData = {
      id: userWithoutPassword.id,
      email: userWithoutPassword.email,
      name: userWithoutPassword.name,
      createdAt: userWithoutPassword.createdAt,
      updatedAt: userWithoutPassword.updatedAt,
    };

    return NextResponse.json(
      {
        message: "Login berhasil",
        user: responseUser,
        token: token,
      },
      { status: 200 }
    );
  } catch (e: any) {
    console.error("Login Error:", e);
    const errorMessage =
      e instanceof Error ? e.message : "Terjadi kesalahan internal";
    return NextResponse.json(
      {
        message: "Login gagal, terjadi kesalahan pada server",
        error: errorMessage,
      }, // Menambahkan field error
      { status: 500 }
    );
  }
}
