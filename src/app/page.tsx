"use client";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-6 leading-tight">
            Deteksi Kematangan & Manfaat Buah dengan AI
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Fruch membantu Anda mengenali tingkat kematangan buah dan memberikan
            informasi tentang manfaat kesehatan dari buah tersebut menggunakan
            teknologi kecerdasan buatan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/classify"
              className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transform hover:scale-102 transition-transform text-center"
            >
              Mulai Deteksi
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md h-80 sm:h-96 md:h-[28rem]">
            <div className="absolute top-0 right-0 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-10 left-0 sm:left-10 w-44 h-44 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-8 sm:left-16 w-44 h-44 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-emerald-800 mb-12">
            Fitur Utama
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-emerald-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-emerald-700 mb-2">
                Deteksi Cepat
              </h3>
              <p className="text-gray-600">
                Unggah foto buah dan dapatkan hasil deteksi kematangan dalam
                hitungan detik dengan teknologi AI.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-emerald-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-emerald-700 mb-2">
                Informasi Manfaat
              </h3>
              <p className="text-gray-600">
                Dapatkan informasi lengkap tentang manfaat kesehatan dari buah
                yang Anda deteksi.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-emerald-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-emerald-700 mb-2">
                Simpan Riwayat
              </h3>
              <p className="text-gray-600">
                Simpan riwayat deteksi buah Anda untuk referensi di masa
                mendatang setelah login.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-emerald-800 mb-12">
          Cara Kerja
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          {/* Step 1 */}
          <div className="flex flex-col items-center max-w-xs text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-emerald-700">1</span>
            </div>
            <h3 className="text-xl font-semibold text-emerald-700 mb-2">
              Unggah Foto
            </h3>
            <p className="text-gray-600">
              Ambil foto buah yang ingin Anda deteksi dan unggah ke aplikasi.
            </p>
          </div>

          {/* Arrow */}
          <div className="hidden md:block text-emerald-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center max-w-xs text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-emerald-700">2</span>
            </div>
            <h3 className="text-xl font-semibold text-emerald-700 mb-2">
              Proses AI
            </h3>
            <p className="text-gray-600">
              Sistem AI kami akan menganalisis gambar dan mendeteksi jenis dan
              kematangan buah.
            </p>
          </div>

          {/* Arrow */}
          <div className="hidden md:block text-emerald-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center max-w-xs text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-emerald-700">3</span>
            </div>
            <h3 className="text-xl font-semibold text-emerald-700 mb-2">
              Lihat Hasil
            </h3>
            <p className="text-gray-600">
              Dapatkan informasi tentang buah dan manfaat kesehatannya secara
              instan.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Siap Mencoba Fruch?
          </h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Mulai deteksi buah sekarang dan pelajari manfaat kesehatan dari
            buah-buahan favorit Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/classify"
              className="px-6 py-3 bg-white text-emerald-700 font-medium rounded-lg hover:bg-emerald-50 transition-colors"
            >
              Mulai Deteksi
            </Link>
            <Link
              href="/register"
              className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
