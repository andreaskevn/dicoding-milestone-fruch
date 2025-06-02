// src/app/api/buah/[id]/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";

interface DeleteScanParams {
  params: {
    id: string; // ID dari scanBuah yang akan dihapus
  };
}

export async function DELETE(
  request: Request,
  { params }: DeleteScanParams
): Promise<NextResponse> {
  const { id: scanId } = params;

  if (!scanId) {
    return NextResponse.json(
      { message: "ID riwayat scan diperlukan.", error: "Bad Request" },
      { status: 400 }
    );
  }

  let imagePathToDelete: string | null = null;

  try {
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
      return NextResponse.json(
        {
          message: "Token tidak valid atau sudah kedaluwarsa.",
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    if (typeof decodedPayload.userId !== "string" || !decodedPayload.userId) {
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

    // Simpan path gambar untuk dihapus nanti
    if (scanToDelete.imageUrl) {
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

    // 5. Hapus file gambar terkait dari server (jika ada)
    if (imagePathToDelete) {
      try {
        await fs.access(imagePathToDelete); // Cek apakah file ada
        await fs.unlink(imagePathToDelete);
        console.log(`File gambar ${scanToDelete.imageUrl} berhasil dihapus.`);
      } catch (fileError) {
        // Abaikan jika file tidak ditemukan (mungkin sudah terhapus atau path salah)
        console.warn(
          `Gagal menghapus file gambar ${scanToDelete.imageUrl} atau file tidak ditemukan:`,
          fileError
        );
      }
    }

    return NextResponse.json(
      { message: `Riwayat scan dengan ID "${scanId}" berhasil dihapus.` },
      { status: 200 } // Bisa juga 204 No Content jika tidak ada body respons
    );
  } catch (error: any) {
    console.error(
      `Kesalahan saat menghapus riwayat scan ID "${scanId}":`,
      error
    );
    let errorMessage = "Gagal menghapus riwayat scan.";
    let statusCode = 500;

    if (error.code === "P2025") {
      // Record to delete does not exist (Prisma)
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
