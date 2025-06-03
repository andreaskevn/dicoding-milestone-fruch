import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import type { FruitData } from "@/lib/definition";

export async function GET(
  _request: NextRequest,
  { params }: { params: { namaBuah: string } }
) {
  try {
    const { namaBuah } = await params;

    if (!namaBuah) {
      return NextResponse.json(
        { message: "Nama buah wajib disertakan sebagai parameter." },
        { status: 400 }
      );
    }

    const decodedNamaBuah = decodeURIComponent(namaBuah);
    console.log(`[API /api/buah/[namaBuah]] Mencari buah: ${decodedNamaBuah}`);

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
    return NextResponse.json(
      { message: "Gagal mengambil data buah.", error: error.message },
      { status: 500 }
    );
  }
}
