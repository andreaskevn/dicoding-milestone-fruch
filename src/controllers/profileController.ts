// src/controllers/profileController.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/authContext";
import type {
  UserProfileData,
  UpdateProfileRequestBody,
  UpdateProfileResponse,
} from "@/lib/definition";
import { useRouter } from "next/navigation";

export function useProfileController() {
  const {
    token,
    user: authUser,
    login: updateAuthContextUser,
    logout,
  } = useAuth();
  const router = useRouter();

  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isUpdatingInfo, setIsUpdatingInfo] = useState(false);
  const [updateInfoError, setUpdateInfoError] = useState<string | null>(null);
  const [updateInfoSuccess, setUpdateInfoSuccess] = useState<string | null>(
    null
  );

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [changePasswordError, setChangePasswordError] = useState<string | null>(
    null
  );
  const [changePasswordSuccess, setChangePasswordSuccess] = useState<
    string | null
  >(null);

  const [deletePasswordConfirm, setDeletePasswordConfirm] = useState("");
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [deleteAccountError, setDeleteAccountError] = useState<string | null>(
    null
  );
  const [deleteAccountSuccess, setDeleteAccountSuccess] = useState<
    string | null
  >(null);

  const fetchProfile = useCallback(async () => {
    if (!token) {
      setError("Sesi tidak valid atau token tidak ditemukan.");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Gagal mengambil data profil.");
      }
      const data: UserProfileData = await response.json();
      setProfileData(data);
      setName(data.name || "");
      setEmail(data.email || "");
    } catch (err: any) {
      setError(err.message);
      setProfileData(null);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchProfile();
    } else if (authUser) {
      setProfileData(authUser as UserProfileData);
      setName(authUser.name || "");
      setEmail(authUser.email || "");
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [token, fetchProfile, authUser]);

  const handleUpdateInfo = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!token) {
      setUpdateInfoError("Sesi tidak valid. Silakan login kembali.");
      return;
    }
    setIsUpdatingInfo(true);
    setUpdateInfoError(null);
    setUpdateInfoSuccess(null);

    const payload: UpdateProfileRequestBody = {};
    if (name !== (profileData?.name || "") || (name && !profileData?.name))
      payload.name = name;
    if (email !== (profileData?.email || "")) payload.email = email;

    if (Object.keys(payload).length === 0) {
      setUpdateInfoError("Tidak ada perubahan data untuk disimpan.");
      setIsUpdatingInfo(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const text = await response.text(); // Ambil sebagai text dulu
      const data = text ? JSON.parse(text) : {}; // Parse manual agar tidak crash kalau kosong

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Gagal memperbarui profil."
        );
      }

      setUpdateInfoSuccess(data.message);
      if (data.user) {
        setProfileData(data.user);
        setName(data.user.name || "");
        setEmail(data.user.email || "");
        if (token) {
          updateAuthContextUser(data.user, token);
        }
      }
    } catch (err: any) {
      setUpdateInfoError(err.message || "Terjadi kesalahan.");
    } finally {
      setIsUpdatingInfo(false);
    }
  };

  const handleChangePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!token) {
      setChangePasswordError("Sesi tidak valid. Silakan login kembali.");
      return;
    }
    if (!currentPassword) {
      setChangePasswordError("Password saat ini wajib diisi.");
      return;
    }
    if (newPassword.length < 6) {
      setChangePasswordError("Password baru minimal harus 6 karakter.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setChangePasswordError(
        "Password baru dan konfirmasi password tidak cocok."
      );
      return;
    }

    setIsChangingPassword(true);
    setChangePasswordError(null);
    setChangePasswordSuccess(null);

    const payload: UpdateProfileRequestBody = {
      currentPassword,
      newPassword,
      confirmNewPassword,
    };

    try {
      const response = await fetch("/api/auth/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data: UpdateProfileResponse = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Gagal mengganti password.");
      }
      setChangePasswordSuccess(data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err: any) {
      setChangePasswordError(err.message);
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!token) {
      setDeleteAccountError("Sesi tidak valid. Silakan login kembali.");
      return;
    }
    if (!deletePasswordConfirm) {
      setDeleteAccountError(
        "Silakan masukkan password Anda saat ini untuk konfirmasi penghapusan akun."
      );
      return;
    }

    setIsDeletingAccount(true);
    setDeleteAccountError(null);
    setDeleteAccountSuccess(null);

    try {
      const response = await fetch("/api/auth/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword: deletePasswordConfirm }),
      });

      const data: { message: string; error?: string } = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal menghapus akun.");
      }
      setDeleteAccountSuccess(
        data.message + " Anda akan segera logout dan diarahkan."
      );

      setTimeout(() => {
        logout();
        router.push("/");
      }, 3000);

      return { success: true, message: data.message };
    } catch (err: any) {
      const errorMsg =
        err instanceof SyntaxError
          ? "Terjadi kesalahan respons dari server. Silakan coba lagi."
          : err.message || "Terjadi kesalahan saat menghapus akun.";

      setDeleteAccountError(errorMsg);
      return { error: errorMsg };
    } finally {
      setIsDeletingAccount(false);
    }
  };

  return {
    profileData,
    isLoading,
    error,
    name,
    setName,
    email,
    setEmail,
    isUpdatingInfo,
    updateInfoError,
    updateInfoSuccess,
    handleUpdateInfo,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    isChangingPassword,
    changePasswordError,
    changePasswordSuccess,
    handleChangePassword,
    deletePasswordConfirm,
    setDeletePasswordConfirm,
    isDeletingAccount,
    deleteAccountError,
    deleteAccountSuccess,
    handleDeleteAccount,
    fetchProfile,
  };
}
