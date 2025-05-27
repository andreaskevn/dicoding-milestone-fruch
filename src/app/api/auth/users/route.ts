import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import type {
  UserProfileData,
  UpdateProfileRequestBody,
  UpdateProfileResponse,
} from "@/lib/definition";

interface JwtPayload {
  userId: string;
  email?: string;
  iat?: number;
  exp?: number;
}

async function getUserIdFromToken(request: Request): Promise<string | null> {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  const token = authHeader.split(" ")[1];
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error("JWT_SECRET tidak ditemukan di environment variables.");
    throw new Error("Kesalahan konfigurasi server internal.");
  }

  try {
    const decodedPayload = jwt.verify(token, jwtSecret) as JwtPayload;
    return decodedPayload.userId;
  } catch (error) {
    console.error("Error verifikasi JWT di getUserIdFromToken:", error);
    return null;
  }
}

export async function GET(
  request: Request
): Promise<
  NextResponse<UserProfileData | { message: string; error?: string }>
> {
  try {
    const currentUserId = await getUserIdFromToken(request);
    if (!currentUserId) {
      return NextResponse.json(
        {
          message: "Akses ditolak. Token tidak valid atau tidak ada.",
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: currentUserId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Pengguna tidak ditemukan.", error: "Not Found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user as UserProfileData, { status: 200 });
  } catch (error: any) {
    console.error("Kesalahan saat mengambil profil (API GET):", error);
    return NextResponse.json(
      {
        message: "Gagal mengambil data profil.",
        error: error.message || "Terjadi kesalahan internal server.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request
): Promise<NextResponse<UpdateProfileResponse>> {
  try {
    const currentUserId = await getUserIdFromToken(request);
    if (!currentUserId) {
      return NextResponse.json(
        {
          message: "Akses ditolak. Token tidak valid atau tidak ada.",
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const body: UpdateProfileRequestBody = await request.json();
    const { name, email, currentPassword, newPassword, confirmNewPassword } =
      body;

    const dataToUpdate: Partial<{
      name: string | null;
      email: string;
      passwordHash: string;
    }> = {};

    if (name !== undefined) {
      dataToUpdate.name = name === "" ? null : name;
    }

    if (email) {
      const existingUserWithNewEmail = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
      });
      if (
        existingUserWithNewEmail &&
        existingUserWithNewEmail.id !== currentUserId
      ) {
        return NextResponse.json(
          {
            message: "Email baru sudah digunakan oleh pengguna lain.",
            error: "Conflict",
          },
          { status: 409 }
        );
      }
      dataToUpdate.email = email.toLowerCase();
    }

    if (newPassword) {
      if (!currentPassword || !confirmNewPassword) {
        return NextResponse.json(
          {
            message:
              "Password saat ini dan konfirmasi password baru wajib diisi untuk mengganti password.",
            error: "Bad Request",
          },
          { status: 400 }
        );
      }
      if (newPassword.length < 6) {
        return NextResponse.json(
          {
            message: "Password baru minimal harus 6 karakter.",
            error: "Bad Request",
          },
          { status: 400 }
        );
      }
      if (newPassword !== confirmNewPassword) {
        return NextResponse.json(
          {
            message: "Password baru dan konfirmasi password tidak cocok.",
            error: "Bad Request",
          },
          { status: 400 }
        );
      }

      const user = await prisma.user.findUnique({
        where: { id: currentUserId },
      });
      if (!user) {
        return NextResponse.json(
          { message: "Pengguna tidak ditemukan.", error: "Not Found" },
          { status: 404 }
        );
      }

      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.passwordHash
      );
      if (!isPasswordValid) {
        return NextResponse.json(
          { message: "Password saat ini salah.", error: "Unauthorized" },
          { status: 401 }
        );
      }

      const saltRounds = 10;
      dataToUpdate.passwordHash = await bcrypt.hash(newPassword, saltRounds);
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json(
        { message: "Tidak ada data yang diubah.", error: "Bad Request" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: currentUserId },
      data: dataToUpdate,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      {
        message: "Profil berhasil diperbarui.",
        user: updatedUser as UserProfileData,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Kesalahan saat memperbarui profil (API PUT):", error);
    let errorMessage = error.message || "Gagal memperbarui profil.";
    let statusCode = 500;

    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      errorMessage = "Email baru sudah digunakan oleh pengguna lain.";
      statusCode = 409;
    }

    return NextResponse.json(
      { message: "Gagal memperbarui profil.", error: errorMessage },
      { status: statusCode }
    );
  }
}

export async function DELETE(
  request: Request
): Promise<NextResponse<{ message: string; error?: string }>> {
  try {
    const currentUserId = await getUserIdFromToken(request);
    if (!currentUserId) {
      return NextResponse.json(
        {
          message: "Akses ditolak. Token tidak valid atau tidak ada.",
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }
    const { currentPassword } = await request.json();

    if (!currentPassword) {
      return NextResponse.json(
        {
          message: "Password saat ini diperlukan untuk menghapus akun.",
          error: "Bad Request",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { id: currentUserId } });
    if (!user) {
      return NextResponse.json(
        { message: "Pengguna tidak ditemukan.", error: "Not Found" },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.passwordHash
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message: "Password saat ini salah. Akun tidak dapat dihapus.",
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }
    await prisma.scanBuah.deleteMany({
      where: { userId: currentUserId },
    });
    await prisma.user.delete({
      where: { id: currentUserId },
    });

    return NextResponse.json(
      { message: "Akun berhasil dihapus." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Kesalahan saat menghapus akun (API DELETE):", error);
    if (error instanceof SyntaxError && error.message.includes("JSON")) {
      return NextResponse.json(
        {
          message:
            "Format permintaan tidak valid atau password saat ini tidak disertakan.",
          error: "Bad Request",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        message: "Gagal menghapus akun.",
        error: error.message || "Terjadi kesalahan internal server.",
      },
      { status: 500 }
    );
  }
}
