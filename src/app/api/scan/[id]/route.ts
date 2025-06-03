// src/app/api/scan/[id]/route.ts
// (atau src/app/api/buah/[id]/route.ts jika Anda tetap menggunakan path itu)
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";

// Definisikan tipe untuk payload JWT Anda jika belum global
interface JwtPayload {
  userId: string;
  email?: string;
  iat?: number;
  exp?: number;
}

export async function DELETE(
  request: NextRequest,
  // Mencoba signature di mana 'params' adalah Promise, sesuai saran Anda
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    // Await 'params' untuk mendapatkan objek yang berisi 'id'
    const resolvedParams = await params;
    const { id: scanId } = resolvedParams; // 'id' dari URL adalah scanId

    if (!scanId) {
      return NextResponse.json(
        { message: "ID riwayat scan diperlukan.", error: "Bad Request" },
        { status: 400 }
      );
    }

    let imagePathToDelete: string | null = null;

    // 1. Autentikasi Pengguna
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
      console.error("JWT_SECRET tidak ditemukan.");
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

    if (
      !decodedPayload ||
      typeof decodedPayload.userId !== "string" ||
      !decodedPayload.userId
    ) {
      return NextResponse.json(
        { message: "User ID tidak valid dalam token.", error: "Unauthorized" },
        { status: 401 }
      );
    }
    const currentUserId: string = decodedPayload.userId;

    // 2. Cari entri scanBuah di database
    const scanToDelete = await prisma.scanBuah.findUnique({
      where: { id: scanId },
    });

    if (!scanToDelete) {
      return NextResponse.json(
        {
          message: `Riwayat scan dengan ID "${scanId}" tidak ditemukan.`,
          error: "Not Found",
        },
        { status: 404 }
      );
    }

    // 3. Otorisasi: Pastikan pengguna hanya menghapus riwayat miliknya
    if (scanToDelete.userId !== currentUserId) {
      return NextResponse.json(
        {
          message: "Anda tidak diizinkan menghapus riwayat ini.",
          error: "Forbidden",
        },
        { status: 403 }
      );
    }

    if (
      scanToDelete.imageUrl &&
      !scanToDelete.imageUrl.startsWith("http") &&
      !scanToDelete.imageUrl.startsWith("data:")
    ) {
      imagePathToDelete = path.join(
        process.cwd(),
        "public",
        scanToDelete.imageUrl
      );
    }

    // 4. Hapus entri dari database
    await prisma.scanBuah.delete({
      where: { id: scanId },
    });

    // 5. Hapus file gambar terkait dari server (jika ada dan merupakan file lokal)
    if (imagePathToDelete) {
      try {
        await fs.access(imagePathToDelete);
        await fs.unlink(imagePathToDelete);
        console.log(
          `File gambar ${scanToDelete.imageUrl} berhasil dihapus dari ${imagePathToDelete}.`
        );
      } catch (fileError: any) {
        if (fileError.code !== "ENOENT") {
          console.warn(
            `Gagal menghapus file gambar ${scanToDelete.imageUrl} atau file tidak ditemukan:`,
            fileError
          );
        } else {
          console.log(
            `File gambar ${scanToDelete.imageUrl} tidak ditemukan untuk dihapus (mungkin sudah terhapus atau path salah).`
          );
        }
      }
    }

    return NextResponse.json(
      { message: `Riwayat scan dengan ID "${scanId}" berhasil dihapus.` },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      `Kesalahan saat menghapus riwayat scan ID "${scanId}":`,
      error
    );
    let errorMessage = "Gagal menghapus riwayat scan.";
    let statusCode = 500;

    if (error.code === "P2025") {
      errorMessage = `Riwayat scan dengan ID "${scanId}" tidak ditemukan untuk dihapus.`;
      statusCode = 404;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { message: errorMessage, error: "Internal Server Error" },
      { status: statusCode }
    );
  }
}
