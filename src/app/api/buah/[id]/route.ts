// src/app/api/buah/[namaBuah]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import type { FruitData } from "@/lib/definition";

// Handler untuk GET request
export async function GET(
  request: NextRequest,
  // Menggunakan 'context' sebagai nama parameter dan mendefinisikan tipenya secara eksplisit
  context: { params: { id: string } }
) {
  try {
    // Akses namaBuah dari context.params
    const { id } = context.params;

    if (!id) {
      return NextResponse.json(
        { message: "Nama buah wajib disertakan sebagai parameter." },
        { status: 400 }
      );
    }

    const decodedNamaBuah = decodeURIComponent(id);
    console.log(`[API /api/buah/[namaBuah]] Mencari buah: ${decodedNamaBuah}`);

    const buah: FruitData | null = await prisma.buah.findUnique({
      where: {
        namaBuah: decodedNamaBuah,
      },
    });

    if (!buah) {
      console.log(
        `[API /api/buah/[namaBuah]] Buah "${decodedNamaBuah}" tidak ditemukan di database.`
      );
      return NextResponse.json(
        { message: `Buah dengan nama "${decodedNamaBuah}" tidak ditemukan.` },
        { status: 404 }
      );
    }

    console.log(
      `[API /api/buah/[namaBuah]] Buah "${decodedNamaBuah}" ditemukan:`,
      buah
    );
    return NextResponse.json(buah, { status: 200 });
  } catch (error: any) {
    console.error(
      "[API /api/buah/[namaBuah]] Kesalahan saat mengambil data buah:",
      error
    );
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
