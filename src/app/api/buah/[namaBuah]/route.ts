// src/app/api/buah/[namaBuah]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import type { FruitData } from "@/lib/definition";

// Interface Params bisa tetap ada untuk kejelasan atau penggunaan lain jika diperlukan,
// tapi kita akan inline strukturnya di signature GET untuk mengatasi error build Vercel.
interface Params {
  namaBuah: string;
}

// Handler untuk GET request
export async function GET(
  request: Request,
  // Definisikan struktur params secara eksplisit dan inline di sini
  context: { params: { namaBuah: string } }
) {
  try {
    // Await context.params untuk memastikan sudah resolve,
    // berdasarkan pesan error runtime Vercel sebelumnya.
    const routeParams = await context.params;
    const { namaBuah } = routeParams; // Akses namaBuah dari params yang sudah di-resolve

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
