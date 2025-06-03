import { NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import jwt, { SignOptions} from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function POST(request: Request): Promise<Response> {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email dan password wajib diisi" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Email atau password salah" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Email atau password salah" },
        { status: 401 }
      );
    }

    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1h';

    if (!jwtSecret) {
      console.error("JWT_SECRET tidak ditemukan di environment variables.");
      return NextResponse.json(
        { message: "Kesalahan konfigurasi server" },
        { status: 500 }
      );
    }

    const payload = {
      userId: user.id,
      email: user.email,
    };

    // const token = jwt.sign(payload, jwtSecret, {
    //   expiresIn: jwtExpiresIn,
    // });

    const signOptions: SignOptions = {
      expiresIn: jwtExpiresIn,
      // Anda bisa menambahkan algoritma di sini jika perlu, defaultnya HS256
      // algorithm: 'HS256'
    };

    // Buat token JWT menggunakan objek signOptions yang sudah ditipekan
    const token = jwt.sign(payload, jwtSecret, signOptions);

    console.log("Token:", token);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: "Login berhasil",
        user: userWithoutPassword,
        token: token,
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("Login Error:", e);
    const errorMessage =
      e instanceof Error ? e.message : "Terjadi kesalahan internal";
    return NextResponse.json(
      { message: "Login gagal, terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
