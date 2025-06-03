"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { useProfileController } from "@/controllers/profileController";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import Footer from "@/components/Footer";

export default function UsersPage() {
  const { user: authUser, isAuthenticated, isLoadingAuth } = useAuth();
  const router = useRouter();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    profileData,
    isLoading: isLoadingProfile,
    error: profileError,
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
  } = useProfileController();

  useEffect(() => {
    if (isLoadingAuth) {
      return;
    }
    if (!isAuthenticated) {
      router.push("/login?redirect=/users");
    }
  }, [isAuthenticated, isLoadingAuth, router]);

  // Enhanced delete account function with SweetAlert
  const handleDeleteAccountWithConfirmation = async () => {
    if (!deletePasswordConfirm.trim()) {
      await Swal.fire({
        icon: "warning",
        title: "Password Diperlukan",
        text: "Silakan masukkan password Anda untuk konfirmasi penghapusan akun.",
        confirmButtonColor: "#ef4444",
        confirmButtonText: "OK",
      });
      return;
    }

    const result = await Swal.fire({
      icon: "warning",
      title: "Konfirmasi Penghapusan Akun",
      html: `
      <div style="text-align: left; margin: 20px 0;">
        <p style="margin-bottom: 15px; color: #374151; font-weight: 500;">
          Anda akan menghapus akun secara permanen dengan detail:
        </p>
        <div style="background: #fef2f2; padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">
          <p style="margin: 5px 0; color: #7f1d1d;"><strong>Email:</strong> ${profileData?.email || authUser?.email || "N/A"}</p>
          <p style="margin: 5px 0; color: #7f1d1d;"><strong>Nama:</strong> ${profileData?.name || authUser?.name || "N/A"}</p>
        </div>
        <div style="margin-top: 15px; padding: 15px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
          <p style="margin: 0; color: #92400e; font-weight: 600;">⚠️ PERINGATAN PENTING:</p>
          <ul style="margin: 10px 0 0 20px; color: #92400e;">
            <li>Semua data akun akan dihapus secara permanen</li>
            <li>Riwayat scan buah akan hilang</li>
            <li>Tindakan ini TIDAK DAPAT diurungkan</li>
          </ul>
        </div>
      </div>
    `,
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus Akun Saya",
      cancelButtonText: "Batal",
      reverseButtons: true,
      focusCancel: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      customClass: {
        popup: "swal-wide",
        confirmButton: "swal-confirm-delete",
        cancelButton: "swal-cancel-button",
      },
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: "Menghapus Akun...",
        html: `
        <div style="text-align: center; padding: 20px;">
          <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f4f6; border-radius: 50%; border-top-color: #ef4444; animation: spin 1s ease-in-out infinite; margin-bottom: 15px;"></div>
          <p style="color: #6b7280; margin: 0;">Sedang memproses penghapusan akun Anda...</p>
        </div>
        <style>
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        </style>
      `,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
      });

      try {
        // Pastikan handleDeleteAccount mengembalikan objek hasil
        const response = await handleDeleteAccount();

        if (response?.error) {
          throw new Error(response.error);
        }

        // Jika sukses
        await Swal.fire({
          icon: "success",
          title: "Akun Berhasil Dihapus",
          text: "Akun Anda telah dihapus secara permanen. Anda akan diarahkan ke halaman utama.",
          confirmButtonColor: "#10b981",
          confirmButtonText: "OK",
          allowOutsideClick: false,
          allowEscapeKey: false,
        });

        router.push("/");
      } catch (error) {
        let errorMessage =
          "Terjadi kesalahan saat menghapus akun. Silakan coba lagi.";

        if (error instanceof Error) {
          errorMessage = error.message;
        }

        await Swal.fire({
          icon: "error",
          title: "Gagal Menghapus Akun",
          text: errorMessage,
          confirmButtonColor: "#ef4444",
          confirmButtonText: "OK",
        });
      }
    }
  };

  if (
    isLoadingAuth ||
    (!isAuthenticated && !isLoadingAuth) ||
    (isLoadingProfile && !profileData && !authUser)
  ) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900">
        <div className="text-center p-10 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl">
          <div className="relative">
            <div className="animate-spin h-16 w-16 border-4 border-green-200 border-t-green-500 rounded-full mx-auto mb-6"></div>
            <div className="absolute inset-0 h-16 w-16 border-4 border-transparent border-t-emerald-400 rounded-full mx-auto animate-ping"></div>
          </div>
          <p className="text-xl text-white font-medium">
            Memeriksa status autentikasi...
          </p>
        </div>
      </div>
    );
  }

  if (!isLoadingAuth && !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="text-center p-10 bg-white rounded-3xl border border-red-200 shadow-xl">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <p className="text-lg text-red-600 font-medium">
            Anda harus login untuk mengakses halaman ini.
          </p>
          <Link
            href="/login?redirect=/users"
            className="mt-4 inline-block px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Login Sekarang
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 mb-4 break-words leading-tight">
            Profil Pengguna
          </h1>
          {(profileData || authUser) && (
            <p className="text-xl text-gray-600 mb-2 font-medium">
              Kelola informasi akun Anda,{" "}
              {profileData?.name ||
                authUser?.name ||
                profileData?.email ||
                authUser?.email}
            </p>
          )}
        </div>

        {/* Error Message */}
        {profileError && !isLoadingProfile && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-red-800">
                  Gagal Memuat Profil
                </h3>
                <p className="text-red-700 mt-1">{profileError}</p>
              </div>
            </div>
          </div>
        )}

        {(!profileError || profileData || authUser) && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Form Update Info */}
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Informasi Akun
                  </h2>
                </div>

                <form onSubmit={handleUpdateInfo} className="space-y-5">
                  <div>
                    <label
                      htmlFor="profileName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nama Lengkap
                    </label>
                    <input
                      id="profileName"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={
                        profileData?.name ||
                        authUser?.name ||
                        "Masukkan nama Anda"
                      }
                      className="mt-1 block w-full px-4 py-3 text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:shadow-md"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="profileEmail"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Alamat Email
                    </label>
                    <input
                      id="profileEmail"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={
                        profileData?.email ||
                        authUser?.email ||
                        "email@example.com"
                      }
                      className="mt-1 block w-full px-4 py-3 text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:shadow-md"
                    />
                  </div>

                  {updateInfoError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">{updateInfoError}</p>
                    </div>
                  )}

                  {updateInfoSuccess && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-600">
                        {updateInfoSuccess}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isUpdatingInfo || isLoadingProfile}
                    className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    {isUpdatingInfo ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Menyimpan...
                      </div>
                    ) : (
                      "Simpan Perubahan Info"
                    )}
                  </button>
                </form>
              </div>

              {/* Form Ganti Password */}
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Ganti Password
                  </h2>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-5">
                  <div className="relative">
                    <label
                      htmlFor="currentPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password Saat Ini
                    </label>
                    <input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="mt-1 block w-full px-4 py-3 pr-10 border text-gray-700 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:shadow-md"
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute top-9 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                      tabIndex={-1}
                    >
                      {showCurrentPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password Baru
                    </label>
                    <input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimal 6 karakter"
                      className="mt-1 block w-full px-4 py-3 pr-1 text-gray-700 placeholder:text-gray-400 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:shadow-md"
                      required
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute top-9 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                      tabIndex={-1}
                    >
                      {showNewPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="confirmNewPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Konfirmasi Password Baru
                    </label>
                    <input
                      id="confirmNewPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="Ulangi password baru"
                      className="mt-1 block w-full px-4 py-3 pr-10 border text-gray-700 placeholder:text-gray-400 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:shadow-md"
                      required
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute top-9 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {changePasswordError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">
                        {changePasswordError}
                      </p>
                    </div>
                  )}

                  {changePasswordSuccess && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-600">
                        {changePasswordSuccess}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isChangingPassword || isLoadingProfile}
                    className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    {isChangingPassword ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Memproses...
                      </div>
                    ) : (
                      "Ganti Password"
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border-t-4 border-red-500">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-red-700">
                  Zona Berbahaya
                </h2>
              </div>

              <div className="bg-red-50 p-6 rounded-2xl mb-6">
                <p className="text-gray-700 mb-2">
                  Untuk menghapus akun Anda secara permanen, masukkan password
                  Anda saat ini dan klik tombol di bawah.
                </p>
                <p className="text-red-600 font-semibold">
                  PERINGATAN: Tindakan ini tidak dapat diurungkan. Semua data
                  Anda, termasuk riwayat scan, akan dihapus.
                </p>
              </div>

              <div className="space-y-5">
                <div className="relative">
                  <label
                    htmlFor="deletePasswordConfirm"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Masukkan Password Saat Ini untuk Konfirmasi:
                  </label>
                  <input
                    id="deletePasswordConfirm"
                    type="password"
                    value={deletePasswordConfirm}
                    onChange={(e) => setDeletePasswordConfirm(e.target.value)}
                    className="mt-1 block w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 hover:shadow-md"
                    required
                    autoComplete="current-password"
                  />
                </div>

                {deleteAccountError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{deleteAccountError}</p>
                  </div>
                )}

                {deleteAccountSuccess && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-600">
                      {deleteAccountSuccess}
                    </p>
                  </div>
                )}

                <button
                  onClick={handleDeleteAccountWithConfirmation}
                  disabled={
                    isDeletingAccount ||
                    !deletePasswordConfirm.trim() ||
                    isLoadingProfile
                  }
                  className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center"
                >
                  {isDeletingAccount ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Menghapus Akun...
                    </div>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Hapus Akun Saya Secara Permanen
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />

      {/* Custom styles for SweetAlert */}
      <style jsx global>{`
        .swal-wide {
          width: 600px !important;
          max-width: 90vw !important;
        }

        .swal-confirm-delete {
          font-weight: 600 !important;
          padding: 12px 24px !important;
          border-radius: 8px !important;
        }

        .swal-cancel-button {
          font-weight: 600 !important;
          padding: 12px 24px !important;
          border-radius: 8px !important;
        }

        .swal2-popup {
          border-radius: 16px !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
        }

        .swal2-title {
          font-size: 1.5rem !important;
          font-weight: 700 !important;
          color: #374151 !important;
        }

        .swal2-html-container {
          font-size: 0.95rem !important;
          line-height: 1.6 !important;
        }
      `}</style>
    </div>
  );
}
