import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import type { FruitData } from "@/lib/definition";

interface Params {
  namaBuah: string;
}

// Handler untuk GET request
export async function GET(
  request: Request,
  context: { params: Params } | { params: Promise<Params> }
) {
  try {
    // Await context.params untuk memastikan sudah resolve jika berupa Promise
    const routeParams = await context.params;
    const { namaBuah } = routeParams;

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
  } catch (error) {
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
