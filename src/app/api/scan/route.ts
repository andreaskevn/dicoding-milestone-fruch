import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import type {
  SaveScanRequestBody,
  SaveScanApiResponse,
} from "@/lib/definition";
import fs from "fs/promises";
import path from "path";

interface JwtPayload {
  userId: string;
  email?: string;
  iat?: number;
  exp?: number;
}

export async function POST(
  request: Request
): Promise<NextResponse<SaveScanApiResponse>> {
  let imagePathOnServer: string | null = null; // Untuk cleanup jika error

  try {
    // 1. Autentikasi Pengguna (kode Anda sebelumnya)
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
    if (typeof decodedPayload.userId !== "string" || !decodedPayload.userId) {
      return NextResponse.json(
        {
          message: "User ID tidak valid atau tidak ditemukan dalam token.",
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }
    const currentUserId: string = decodedPayload.userId;

    // 2. Parsing FormData menggunakan request.formData()
    const formData = await request.formData();

    // 3. Proses File Gambar
    const imageFile = formData.get("imageFile") as File | null; // 'imageFile' dari FormData klien

    if (!imageFile) {
      return NextResponse.json(
        {
          message: "File gambar tidak ditemukan dalam request.",
          error: "Bad Request",
        },
        { status: 400 }
      );
    }
    if (!imageFile.name || !imageFile.type?.startsWith("image/")) {
      return NextResponse.json(
        {
          message: "File yang diunggah bukan gambar yang valid.",
          error: "Bad Request",
        },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "/public/uploads/scans");
    await fs.mkdir(uploadDir, { recursive: true });

    const uniqueFilename = `${Date.now()}_${imageFile.name.replace(/\s+/g, "_")}`;
    imagePathOnServer = path.join(uploadDir, uniqueFilename);

    // Simpan file gambar
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    await fs.writeFile(imagePathOnServer, imageBuffer);

    const imageUrlPath = `/uploads/scans/${uniqueFilename}`;

    // 4. Ambil dan Validasi Data Lain dari formData
    const buahId = formData.get("buahId") as string | null; // formData.get() mengembalikan string atau null
    const predictedBuahName = formData.get("predictedBuahName") as
      | string
      | null;
    const probabilityStr = formData.get("probability") as string | null;

    if (!predictedBuahName || !probabilityStr) {
      if (imagePathOnServer)
        await fs.unlink(imagePathOnServer).catch(console.error);
      return NextResponse.json(
        {
          message:
            "Data tidak lengkap. Field predictedBuahName dan probability wajib diisi.",
          error: "Bad Request",
        },
        { status: 400 }
      );
    }

    const probability = parseFloat(probabilityStr);
    if (isNaN(probability) || probability < 0 || probability > 1) {
      if (imagePathOnServer)
        await fs.unlink(imagePathOnServer).catch(console.error);
      return NextResponse.json(
        {
          message: "Probabilitas harus berupa angka antara 0 dan 1.",
          error: "Bad Request",
        },
        { status: 400 }
      );
    }

    if (buahId) {
      const buahExists = await prisma.buah.findUnique({
        where: { id: buahId },
      });
      if (!buahExists) {
        if (imagePathOnServer)
          await fs.unlink(imagePathOnServer).catch(console.error);
        return NextResponse.json(
          {
            message: `Buah dengan ID "${buahId}" tidak ditemukan.`,
            error: "Not Found",
          },
          { status: 404 }
        );
      }
    }

    // 5. Simpan ke Database
    const dataToSave = {
      userId: currentUserId,
      buahId: buahId || null,
      predictedBuahName: predictedBuahName,
      probability: probability,
      imageUrl: imageUrlPath,
    };

    const newScan = await prisma.scanBuah.create({
      data: dataToSave,
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
    if (imagePathOnServer) {
      try {
        await fs.access(imagePathOnServer);
        await fs.unlink(imagePathOnServer);
        console.log(`File ${imagePathOnServer} dihapus karena error.`);
      } catch (cleanupError) {
        console.error(
          `Gagal menghapus file ${imagePathOnServer} setelah error:`,
          cleanupError
        );
      }
    }

    let errorMessage = "Terjadi kesalahan internal server.";
    let statusCode = 500;

    if (error.code) {
      // Handle Prisma errors
      // ... (blok error Prisma Anda sebelumnya, bisa disalin ke sini) ...
      switch (error.code) {
        case "P2002":
          errorMessage = `Data scan dengan beberapa field unik ini mungkin sudah ada.`;
          statusCode = 409;
          break;
        case "P2003":
          const fieldName = (error.meta?.field_name as string) || "";
          if (fieldName.includes("userId")) {
            errorMessage =
              "User ID yang diberikan tidak valid atau tidak ditemukan.";
          } else if (fieldName.includes("buahId")) {
            errorMessage =
              "Buah ID yang diberikan tidak valid atau tidak ditemukan.";
          } else {
            errorMessage = `Referensi ke '${fieldName}' tidak valid.`;
          }
          statusCode = 400;
          break;
        default:
          errorMessage = `Kesalahan database (${error.code}): Silakan coba lagi.`;
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

export async function DELETE(request: Request): Promise<NextResponse> {
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

    // 2. Ambil semua path gambar yang akan dihapus untuk pengguna ini
    const scansToDelete = await prisma.scanBuah.findMany({
      where: { userId: currentUserId },
      select: { imageUrl: true }, // Hanya butuh imageUrl
    });

    // 3. Hapus semua file gambar terkait dari server
    for (const scan of scansToDelete) {
      if (scan.imageUrl) {
        const imagePath = path.join(process.cwd(), "public", scan.imageUrl);
        try {
          await fs.access(imagePath);
          await fs.unlink(imagePath);
          console.log(`File gambar ${scan.imageUrl} berhasil dihapus.`);
        } catch (fileError) {
          console.warn(
            `Gagal menghapus file gambar ${scan.imageUrl} atau file tidak ditemukan:`,
            fileError
          );
        }
      }
    }

    // 4. Hapus semua entri scanBuah dari database untuk pengguna ini
    const deleteResult = await prisma.scanBuah.deleteMany({
      where: { userId: currentUserId },
    });

    return NextResponse.json(
      {
        message: `Berhasil menghapus ${deleteResult.count} riwayat scan untuk pengguna.`,
        count: deleteResult.count,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Kesalahan saat menghapus semua riwayat scan pengguna:",
      error
    );
    return NextResponse.json(
      {
        message: "Gagal menghapus semua riwayat scan.",
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
