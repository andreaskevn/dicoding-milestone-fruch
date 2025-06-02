"use client";

import Link from 'next/link';
import { useRegisterController } from "@/controllers/registerController";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function RegisterPage() {
    const {
        form,
        isLoading,
        error,
        successMessage,
        handleChange,
        handleSubmit
    } = useRegisterController();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    return (
        <>
            {/* Custom CSS in head */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
          
          @keyframes spinSlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes bounceSlow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          .animate-blob {
            animation: blob 7s infinite;
          }
          
          .animate-float {
            animation: float linear infinite;
          }
          
          .animate-spin-slow {
            animation: spinSlow 8s linear infinite;
          }
          
          .animate-bounce-slow {
            animation: bounceSlow 3s infinite;
          }
          
          .animate-fade-in {
            animation: fadeIn 0.8s ease-out;
          }
          
          .animate-fade-in-delay {
            animation: fadeIn 0.8s ease-out 0.2s both;
          }
          
          .animate-fade-in-delay-2 {
            animation: fadeIn 0.8s ease-out 0.8s both;
          }
          
          .animate-slide-up {
            animation: slideUp 0.6s ease-out;
          }
          
          .animate-slide-up-delay-1 {
            animation: slideUp 0.6s ease-out 0.2s both;
          }
          
          .animate-slide-up-delay-2 {
            animation: slideUp 0.6s ease-out 0.4s both;
          }
          
          .animate-slide-up-delay-3 {
            animation: slideUp 0.6s ease-out 0.6s both;
          }
          
          .animate-slide-up-delay-4 {
            animation: slideUp 0.6s ease-out 0.8s both;
          }
          
          .animate-slide-up-delay-5 {
            animation: slideUp 0.6s ease-out 1.0s both;
          }
          
          .animate-shake {
            animation: shake 0.5s ease-in-out;
          }
          
          .animation-delay-2s {
            animation-delay: 2s;
          }
          
          .animation-delay-4s {
            animation-delay: 4s;
          }
        `,
                }}
            />

            <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 px-4 py-8 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Animated Gradient Orbs */}
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                    <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2s"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-teal-400 to-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4s"></div>

                    {/* Floating Particles */}
                    {[...Array(15)].map((_, i) => {
                        // Use index-based values for consistent SSR/client rendering
                        const left = (i * 7 + 13) % 100;
                        const top = (i * 11 + 7) % 100;
                        const size = (i % 4) + 4;
                        const delay = i % 5;
                        const duration = (i % 10) + 10;

                        return (
                            <div
                                key={i}
                                className="absolute bg-white/20 rounded-full animate-float"
                                style={{
                                    left: `${left}%`,
                                    top: `${top}%`,
                                    width: `${size}px`,
                                    height: `${size}px`,
                                    animationDelay: `${delay}s`,
                                    animationDuration: `${duration}s`,
                                }}
                            ></div>
                        );
                    })}

                    {/* Geometric Shapes */}
                    <div className="absolute top-20 left-20 w-16 h-16 border-2 border-teal-300/30 rotate-45 animate-spin-slow"></div>
                    <div className="absolute bottom-20 right-20 w-12 h-12 bg-gradient-to-r from-emerald-300/20 to-cyan-300/20 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/2 left-10 w-8 h-8 bg-teal-300/20 transform rotate-45 animate-bounce-slow"></div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 p-8 backdrop-blur-md bg-white/30 shadow-2xl rounded-xl w-full max-w-2xl transform transition-all hover:scale-[1.02] duration-300">
                    <div className="text-center mb-8">
                        <div className="inline-block text-teal-600 hover:text-teal-800 transition-colors">
                            <Image
                                src="/logo.png"
                                alt="Fruch Logo"
                                width={80}
                                height={80}
                            />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 animate-fade-in">
                            Buat Akun Baru
                        </h1>
                        <p className="text-gray-600 mt-2 animate-fade-in-delay">
                            Isi detail di bawah ini untuk memulai.
                        </p>
                    </div>

                    {successMessage && (
                        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-md animate-fade-in" role="alert">
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
                        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md animate-shake" role="alert">
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
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-slide-up">
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
                                                 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-300 text-black
                                                 hover:shadow-md focus:scale-[1.02]"
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
                                                 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-300 text-black
                                                 hover:shadow-md focus:scale-[1.02]"
                                    />
                                </div>
                            </div>

                            <div className="animate-slide-up-delay-1">
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
                                             sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-300 text-black
                                             hover:shadow-md focus:scale-[1.02]"
                                    required
                                    autoComplete="email"
                                />
                            </div>

                            <div className="relative animate-slide-up-delay-2">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Minimal 6 karakter"
                                    value={form.password}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    className="mt-1 block w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 
                                             focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
                                             sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-300 text-black
                                             hover:shadow-md focus:scale-[1.02]"
                                    required
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute top-10 right-3 text-gray-500 hover:text-gray-700 focus:outline-none transform hover:scale-110 transition-transform duration-200"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            <div className="relative animate-slide-up-delay-3">
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Konfirmasi Password <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Ulangi password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    className="mt-1 block w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 
                                             focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
                                             sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-300 text-black
                                             hover:shadow-md focus:scale-[1.02]"
                                    required
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute top-10 right-3 text-gray-500 hover:text-gray-700 focus:outline-none transform hover:scale-110 transition-transform duration-200"
                                    tabIndex={-1}
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg 
                                         text-base font-medium text-white bg-gradient-to-r from-teal-600 to-emerald-600 
                                         hover:from-teal-700 hover:to-emerald-700 focus:outline-none focus:ring-2 
                                         focus:ring-offset-2 focus:ring-teal-500 disabled:from-teal-400 
                                         disabled:to-emerald-400 disabled:cursor-not-allowed transition-all duration-300 
                                         ease-in-out transform hover:scale-105 active:scale-95 animate-slide-up-delay-4
                                         hover:shadow-xl"
                            >
                                {isLoading ? (
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
                                    "Daftar Akun"
                                )}
                            </button>
                        </form>
                    )}

                    <p className="mt-8 text-center text-sm text-gray-600 animate-fade-in-delay-2">
                        Sudah punya akun?{' '}
                        <Link
                            href="/login"
                            className="font-medium text-teal-600 hover:text-teal-500 hover:underline transition-all duration-200 hover:scale-105 inline-block"
                        >
                            Login di sini
                        </Link>
                    </p>
                </div>

                <div className="relative z-10 mt-8 text-center transform transition-all hover:scale-105 duration-300 ease-in-out animate-slide-up-delay-5">
                    <button>
                        <Link
                            href={"/"}
                            className="font-medium bg-gradient-to-r from-teal-600 to-emerald-600 py-3 px-6 rounded-lg text-white 
                                     hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl
                                     transform hover:scale-105 active:scale-95"
                        >
                            Balik ke Home
                        </Link>
                    </button>
                </div>
            </div>
        </>
    );
}