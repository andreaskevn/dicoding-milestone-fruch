import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import type {
  SaveScanRequestBody,
  SaveScanApiResponse,
} from "@/lib/definition";

interface JwtPayload {
  userId: string;
  email?: string;
  iat?: number;
  exp?: number;
}

export async function POST(
  request: Request
): Promise<NextResponse<SaveScanApiResponse>> {
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

    const currentUserId = decodedPayload.userId;
    if (!currentUserId) {
      return NextResponse.json(
        {
          message: "User ID tidak ditemukan dalam token.",
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const body: Omit<SaveScanRequestBody, "userId"> & { buahId?: string } =
      await request.json();
    const { buahId, predictedBuahName, probability, imageUrl } = body;

    if (
      predictedBuahName === undefined ||
      probability === undefined ||
      imageUrl === undefined
    ) {
      return NextResponse.json(
        {
          message:
            "Data tidak lengkap. Field predictedBuahName, probability, dan imageUrl wajib diisi.",
          error: "Bad Request",
        },
        { status: 400 }
      );
    }

    if (probability < 0 || probability > 1) {
      return NextResponse.json(
        { message: "Probabilitas harus antara 0 dan 1.", error: "Bad Request" },
        { status: 400 }
      );
    }

    if (buahId) {
      const buahExists = await prisma.buah.findUnique({
        where: { id: buahId },
      });
      if (!buahExists) {
        return NextResponse.json(
          {
            message: `Buah dengan ID "${buahId}" tidak ditemukan.`,
            error: "Not Found",
          },
          { status: 404 }
        );
      }
    }

    const newScan = await prisma.scanBuah.create({
      data: {
        userId: currentUserId, 
        buahId: buahId,
        predictedBuahName: predictedBuahName,
        probability: probability,
        imageUrl: imageUrl,
      },
      select: {
        id: true,
        userId: true,
        buahId: true,
        predictedBuahName: true,
        probability: true,
        imageUrl: true,
        scannedAt: true,
      },
    });

    return NextResponse.json(
      { message: "Hasil scan berhasil disimpan!", scan: newScan },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Kesalahan saat menyimpan hasil scan (API):", error);
    let errorMessage = "Terjadi kesalahan internal server.";
    let statusCode = 500;

    if (error.code) {
      switch (error.code) {
        case "P2002":
          errorMessage = `Data scan dengan beberapa field unik ini mungkin sudah ada.`;
          statusCode = 409;
          break;
        case "P2003":
          if (error.meta?.field_name?.includes("userId")) {
            errorMessage =
              "User ID yang diberikan tidak valid atau tidak ditemukan.";
          } else if (error.meta?.field_name?.includes("buahId")) {
            errorMessage =
              "Buah ID yang diberikan tidak valid atau tidak ditemukan.";
          } else {
            errorMessage = "Referensi ke data lain tidak valid.";
          }
          statusCode = 400;
          break;
        default:
          errorMessage = `Kesalahan database: ${error.message}`;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { message: "Gagal menyimpan hasil scan.", error: errorMessage },
      { status: statusCode }
    );
  }
}

export async function GET(request: Request) {
  try {
    const scans = await prisma.scanBuah.findMany({
      orderBy: { scannedAt: "desc" },
    });
    return NextResponse.json({ scans }, { status: 200 });
  } catch (error: any) {
    console.error("Kesalahan saat mengambil data scan (API):", error);
    return NextResponse.json(
      { message: "Gagal mengambil data scan.", error: error.message },
      { status: 500 }
    );
  }
} 
