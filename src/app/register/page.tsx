"use client";

import Link from 'next/link';
import { useRegisterController } from "@/controllers/registerController";

export default function RegisterPage() {
    const {
        form,
        isLoading,
        error,
        successMessage,
        handleChange,
        handleSubmit
    } = useRegisterController();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-teal-50 to-cyan-100 px-4 py-8">
            <div className="p-8 bg-white shadow-2xl rounded-xl w-full max-w-lg transform transition-all hover:scale-[1.02] duration-300">
                <div className="text-center mb-8">
                    <Link href="/" legacyBehavior>
                        <a className="inline-block mb-4 text-teal-600 hover:text-teal-800 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                            </svg>
                        </a>
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Buat Akun Baru
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Isi detail di bawah ini untuk memulai.
                    </p>
                </div>

                {successMessage && (
                    <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-4 rounded-md" role="alert">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-700">{successMessage}</p>
                            </div>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-md" role="alert">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {!successMessage && (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label
                                    htmlFor="first_name"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Nama Depan <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="first_name"
                                    name="first_name"
                                    type="text"
                                    placeholder="John"
                                    value={form.first_name}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 
                            focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
                            sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="last_name"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Nama Belakang
                                </label>
                                <input
                                    id="last_name"
                                    name="last_name"
                                    type="text"
                                    placeholder="Doe"
                                    value={form.last_name}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 
                            focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
                            sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Alamat Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                                disabled={isLoading}
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 
                           focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
                           sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                                required
                                autoComplete="email"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Minimal 6 karakter"
                                value={form.password}
                                onChange={handleChange}
                                disabled={isLoading}
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 
                           focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
                           sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                                required
                                autoComplete="new-password"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Konfirmasi Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Ulangi password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                disabled={isLoading}
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 
                           focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
                           sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                                required
                                autoComplete="new-password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg 
                         text-base font-medium text-white bg-teal-600 hover:bg-teal-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 
                         disabled:bg-teal-400 disabled:cursor-not-allowed 
                         transition-all duration-150 ease-in-out transform hover:scale-105 active:scale-95"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Memproses...
                                </div>
                            ) : (
                                "Daftar Akun"
                            )}
                        </button>
                    </form>
                )}

                <p className="mt-8 text-center text-sm text-gray-600">
                    Sudah punya akun?{' '}
                    <Link href="/login" legacyBehavior>
                        <a className="font-medium text-teal-600 hover:text-teal-500 hover:underline">
                            Login di sini
                        </a>
                    </Link>
                </p>
            </div>
        </div>
    );
}