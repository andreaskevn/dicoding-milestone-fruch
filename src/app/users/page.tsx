// src/app/profile/page.tsx
"use client";

import { useEffect } from 'react';
import { useAuth } from '@/context/authContext'; // Sesuaikan path jika berbeda
import { useProfileController } from '@/controllers/profileController'; // Sesuaikan path
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const { user: authUser, isAuthenticated, isLoadingAuth } = useAuth(); // Ambil token dari useAuth jika diperlukan di sini, atau controller sudah menanganinya
    const router = useRouter();
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
        // State dan fungsi untuk delete account
        deletePasswordConfirm,
        setDeletePasswordConfirm,
        isDeletingAccount,
        deleteAccountError,
        deleteAccountSuccess,
        handleDeleteAccount,
    } = useProfileController();

    useEffect(() => {
        // Jika loading status autentikasi belum selesai, jangan lakukan apa-apa
        if (isLoadingAuth) {
            return;
        }
        // Jika sudah selesai loading dan tidak terautentikasi, redirect ke login
        if (!isAuthenticated) {
            router.push('/login?redirect=/profile');
        }
    }, [isAuthenticated, isLoadingAuth, router]);

    // Tampilkan loading jika status autentikasi masih dicek,
    // atau jika belum terautentikasi (sebelum redirect sempat terjadi),
    // atau jika data profil sedang dimuat dan belum ada data awal dari authUser
    if (isLoadingAuth || (!isAuthenticated && !isLoadingAuth) || (isLoadingProfile && !profileData && !authUser)) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center p-10">
                    <svg className="animate-spin h-10 w-10 text-sky-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-lg text-gray-700">Memuat...</p>
                </div>
            </div>
        );
    }

    // Jika tidak terautentikasi dan loading auth sudah selesai (seharusnya sudah di-redirect, tapi sebagai fallback)
    if (!isLoadingAuth && !isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-lg text-red-600">Anda harus login untuk mengakses halaman ini.</p>
            </div>
        );
    }


    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50">
            <header className="mb-10 text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-500">
                    Profil Pengguna
                </h1>
                {/* Gunakan profileData jika sudah ada, fallback ke authUser */}
                {(profileData || authUser) && (
                    <p className="text-lg text-gray-600 mt-2">
                        Kelola informasi akun Anda, {profileData?.name || authUser?.name || profileData?.email || authUser?.email}.
                    </p>
                )}
            </header>

            {/* Tampilkan error fetch profil awal jika ada */}
            {profileError && !isLoadingProfile && (
                <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow" role="alert">
                    <p className="font-bold">Gagal Memuat Profil</p>
                    <p>{profileError}</p>
                </div>
            )}

            {/* Tampilkan form hanya jika tidak ada error fetch awal ATAU jika data profil (atau authUser sebagai fallback) ada */}
            {(!profileError || profileData || authUser) && (
                <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Form Update Info Dasar */}
                        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Informasi Akun</h2>
                            <form onSubmit={handleUpdateInfo} className="space-y-5">
                                <div>
                                    <label htmlFor="profileName" className="block text-sm font-medium text-gray-700">Nama Lengkap:</label>
                                    <input
                                        id="profileName"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder={profileData?.name || authUser?.name || "Masukkan nama Anda"}
                                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="profileEmail" className="block text-sm font-medium text-gray-700">Alamat Email:</label>
                                    <input
                                        id="profileEmail"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={profileData?.email || authUser?.email || "email@example.com"}
                                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                    />
                                </div>
                                {updateInfoError && <p className="text-sm text-red-600 bg-red-100 p-2 rounded">{updateInfoError}</p>}
                                {updateInfoSuccess && <p className="text-sm text-green-600 bg-green-100 p-2 rounded">{updateInfoSuccess}</p>}
                                <button
                                    type="submit"
                                    disabled={isUpdatingInfo || isLoadingProfile}
                                    className="w-full py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg shadow-md disabled:bg-gray-400 transition-colors"
                                >
                                    {isUpdatingInfo ? 'Menyimpan...' : 'Simpan Perubahan Info'}
                                </button>
                            </form>
                        </div>

                        {/* Form Ganti Password */}
                        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Ganti Password</h2>
                            <form onSubmit={handleChangePassword} className="space-y-5">
                                <div>
                                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Password Saat Ini:</label>
                                    <input
                                        id="currentPassword"
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                        required
                                        autoComplete="current-password"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Password Baru:</label>
                                    <input
                                        id="newPassword"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Minimal 6 karakter"
                                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                        required
                                        autoComplete="new-password"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">Konfirmasi Password Baru:</label>
                                    <input
                                        id="confirmNewPassword"
                                        type="password"
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        placeholder="Ulangi password baru"
                                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                        required
                                        autoComplete="new-password"
                                    />
                                </div>
                                {changePasswordError && <p className="text-sm text-red-600 bg-red-100 p-2 rounded">{changePasswordError}</p>}
                                {changePasswordSuccess && <p className="text-sm text-green-600 bg-green-100 p-2 rounded">{changePasswordSuccess}</p>}
                                <button
                                    type="submit"
                                    disabled={isChangingPassword || isLoadingProfile}
                                    className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md disabled:bg-gray-400 transition-colors"
                                >
                                    {isChangingPassword ? 'Memproses...' : 'Ganti Password'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Bagian Danger Zone untuk Hapus Akun */}
                    <div className="mt-10 bg-white p-6 sm:p-8 rounded-xl shadow-2xl border-t-4 border-red-500">
                        <h2 className="text-2xl font-bold text-red-700 mb-4">Zona Berbahaya</h2>
                        <p className="text-sm text-gray-700 mb-1">
                            Untuk menghapus akun Anda secara permanen, masukkan password Anda saat ini dan klik tombol di bawah.
                        </p>
                        <p className="text-sm text-red-600 font-semibold mb-5">
                            PERINGATAN: Tindakan ini tidak dapat diurungkan. Semua data Anda, termasuk riwayat scan, akan dihapus.
                        </p>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="deletePasswordConfirm" className="block text-sm font-medium text-gray-700">
                                    Masukkan Password Saat Ini untuk Konfirmasi:
                                </label>
                                <input
                                    id="deletePasswordConfirm"
                                    type="password"
                                    value={deletePasswordConfirm}
                                    onChange={(e) => setDeletePasswordConfirm(e.target.value)}
                                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                    required
                                    autoComplete="current-password"
                                />
                            </div>
                            {deleteAccountError && <p className="text-sm text-red-600 bg-red-100 p-2 rounded">{deleteAccountError}</p>}
                            {deleteAccountSuccess && <p className="text-sm text-green-600 bg-green-100 p-2 rounded">{deleteAccountSuccess}</p>}
                            <button
                                onClick={handleDeleteAccount}
                                disabled={isDeletingAccount || !deletePasswordConfirm.trim() || isLoadingProfile}
                                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md disabled:bg-red-300 disabled:cursor-not-allowed transition-colors"
                            >
                                {isDeletingAccount ? 'Menghapus Akun...' : 'Hapus Akun Saya Secara Permanen'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <footer className="text-center mt-12 py-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Aplikasi Fruch. Semua Hak Dilindungi.</p>
            </footer>
        </div>
    );
}
