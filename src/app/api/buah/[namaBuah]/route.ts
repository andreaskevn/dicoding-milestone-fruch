// src/app/api/buah/[namaBuah]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import type { FruitData } from "@/lib/definition";

interface Params {
  namaBuah: string;
}

// Handler untuk GET request
export async function GET(
  request: Request,
  // Gunakan signature standar yang diterima TypeScript untuk RouteContext
  { params }: { params: Params }
) {
  try {
    // Meskipun 'params' di sini secara tipe adalah objek biasa (Params),
    // kita akan coba await berdasarkan pesan error runtime Vercel.
    // Jika 'params' bukan promise, await tidak akan mengubah perilakunya.
    // Jika 'params' adalah promise di environment Vercel, ini akan menunggunya.
    const resolvedParams = await params;
    const { namaBuah } = resolvedParams;

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
    // Ubah tipe error ke any untuk menangani error.message
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
