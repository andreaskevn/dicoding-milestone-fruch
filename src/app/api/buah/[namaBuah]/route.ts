// src/app/api/buah/[namaBuah]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import type { FruitData } from "@/lib/definition";

// Handler untuk GET request
export async function GET(
  request: Request,
  // Destructure params langsung dan berikan tipe di sini
  // Ini adalah cara standar untuk App Router Route Handlers
  { params }: { params: { namaBuah: string } }
) {
  try {
    // Akses namaBuah langsung dari params yang sudah di-destructure
    const { namaBuah } = params;

    if (!namaBuah) {
      return NextResponse.json(
        { message: "Nama buah wajib disertakan sebagai parameter." },
        { status: 400 }
      );
    }

    const decodedNamaBuah = decodeURIComponent(namaBuah);

    const buah: FruitData | null = await prisma.buah.findUnique({
      where: {
        namaBuah: decodedNamaBuah,
      },
    });

    if (!buah) {
      return NextResponse.json(
        { message: `Buah dengan nama "${decodedNamaBuah}" tidak ditemukan.` },
        { status: 404 }
      );
    }

    return NextResponse.json(buah, { status: 200 });
  } catch (error: any) {
    console.error("Kesalahan saat mengambil data buah:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Terjadi kesalahan internal server.";
    return NextResponse.json(
      { message: "Gagal mengambil data buah.", error: errorMessage },
      { status: 500 }
    );
  }
}
