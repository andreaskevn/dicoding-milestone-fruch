"use client";

import Link from 'next/link';
import { useLoginController } from "@/controllers/loginController";

export default function LoginPage() {
  const { form, isLoading, error, handleChange, handleSubmit } =
    useLoginController();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-stone-100 px-4">
      <div className="p-8 bg-white shadow-2xl rounded-xl w-full max-w-md transform transition-all hover:scale-[1.02] duration-300">
        <div className="text-center mb-8">
          <Link href="/" legacyBehavior>
            <a className="inline-block mb-4 text-indigo-600 hover:text-indigo-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </a>
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">
            Login ke Akun Anda
          </h1>
          <p className="text-gray-600 mt-2">
            Selamat datang kembali! Silakan masukkan detail Anda.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Alamat Email
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
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
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
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                         sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md" role="alert">
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg 
                       text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                       disabled:bg-indigo-400 disabled:cursor-not-allowed 
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
              "Login"
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Belum punya akun?{' '}
          <Link href="/register" legacyBehavior>
            <a className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
              Daftar di sini
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
}
