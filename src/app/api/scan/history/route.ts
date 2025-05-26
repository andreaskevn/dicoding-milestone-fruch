import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  email?: string;
  iat?: number;
  exp?: number;
}

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          message: "Token autentikasi tidak ditemukan atau format salah.",
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      console.error("JWT_SECRET tidak ditemukan di environment variables.");
      return NextResponse.json(
        {
          message: "Kesalahan konfigurasi server.",
          error: "Internal Server Error",
        },
        { status: 500 }
      );
    }

    let decodedPayload: JwtPayload;
    try {
      decodedPayload = jwt.verify(token, jwtSecret) as JwtPayload;
    } catch (error) {
      console.error("Error verifikasi JWT:", error);
      return NextResponse.json(
        {
          message: "Token tidak valid atau sudah kedaluwarsa.",
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const userId = decodedPayload.userId;
    if (!userId) {
      return NextResponse.json(
        {
          message: "User ID tidak ditemukan dalam token.",
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // Fetch scan history for the authenticated user
    const scans = await prisma.scanBuah.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        scannedAt: "desc",
      },
    });

    return NextResponse.json({ scans }, { status: 200 });
  } catch (error: any) {
    console.error("Kesalahan saat mengambil riwayat scan:", error);
    return NextResponse.json(
      {
        message: "Gagal mengambil riwayat scan.",
        error: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}