"use client";
import { useClassifyAndFetchFruitController } from "@/controllers/classifyController"
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/Header";

export default function ClassifyPage() {
  const {
    imagePreview,
    imageRef,
    rawPredictions,
    topPrediction,
    fruitDetails,
    isClassifying,
    isFetchingDetails,
    isSavingScan,
    error,
    saveScanError,
    saveScanSuccess,
    handleImageUpload,
    processImageAndGetDetails,
    handleSaveScan,
  } = useClassifyAndFetchFruitController();

  const { isAuthenticated, isLoadingAuth, user, token: authToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoadingAuth) {
      return;
    }
    if (!isAuthenticated) {
      router.push("/login?redirect=/classify");
    }
  }, [isAuthenticated, isLoadingAuth, router]);

  if (isLoadingAuth || !isAuthenticated) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-300/30 to-emerald-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-teal-300/30 to-cyan-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-green-200/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <Header />

      <div className="container mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
        {/* Header with enhanced styling */}
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
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 mb-4 leading-tight">
            AI Fruit Scanner
          </h1>
          <p className="text-xl text-gray-600 mb-2 font-medium">
            Deteksi Kematangan & Manfaat Buah dengan Teknologi AI
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main upload card with enhanced design */}
          <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 mb-8">
            {/* Upload Section */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Pilih Gambar Buah
              </label>

              <div className="relative group">
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="border-2 border-dashed border-green-300 rounded-2xl p-8 text-center bg-gradient-to-br from-green-50 to-emerald-50 group-hover:border-green-400 group-hover:bg-gradient-to-br group-hover:from-green-100 group-hover:to-emerald-100 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-gray-700 mb-2">
                    Klik untuk upload atau drag & drop
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG, atau JPEG (Maks. 10MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Image Preview with enhanced styling */}
            {imagePreview && (
              <div className="mb-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="relative bg-white p-4 rounded-2xl shadow-lg">
                    <p className="text-center text-gray-600 font-medium mb-4 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      Pratinjau Gambar
                    </p>
                    <img
                      ref={imageRef}
                      src={imagePreview}
                      alt="Pratinjau Gambar Buah"
                      className="w-full max-w-md mx-auto h-auto object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                      onLoad={processImageAndGetDetails}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Loading State with enhanced animation */}
            {(isClassifying || isFetchingDetails) && (
              <div className="mb-8 p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                <div className="flex flex-col items-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 border-4 border-green-200 border-t-green-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-emerald-400 rounded-full animate-ping"></div>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-semibold text-green-700 mb-2">
                      {isClassifying
                        ? "🤖 AI sedang menganalisis..."
                        : isFetchingDetails
                          ? "📖 Mengambil informasi buah..."
                          : "⚡ Memproses..."}
                    </p>
                    <p className="text-gray-600">Mohon tunggu sebentar...</p>
                  </div>
                </div>
              </div>
            )}

            {/* Error State with enhanced styling */}
            {error && !isClassifying && !isFetchingDetails && (
              <div
                className="mb-8 bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-400 p-6 rounded-xl shadow-lg"
                role="alert"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <svg
                        className="h-6 w-6 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-red-800 mb-1">
                      Oops! Terjadi kesalahan
                    </h3>
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Section with enhanced cards */}
          {topPrediction && !isClassifying && !isFetchingDetails && !error && (
            <div className="grid gap-6 mb-8">
              {/* Main Result Card */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-3xl shadow-2xl text-white transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-1">
                      🎯 Hasil Deteksi
                    </h2>
                    <p className="text-green-100">
                      AI berhasil mengidentifikasi buah Anda!
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold mb-2">
                    🍎 {topPrediction.className}
                  </h3>
                  <div className="flex items-center">
                    <span className="text-lg mr-3">Tingkat Kepercayaan:</span>
                    <div className="flex-1 bg-white/20 rounded-full h-3 mr-3">
                      <div
                        className="bg-white h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${topPrediction.probability * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xl font-bold">
                      {(topPrediction.probability * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Fruit Details Card */}
              {fruitDetails && (
                <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mr-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">
                        📚 Manfaat {fruitDetails.namaBuah}
                      </h3>
                      <p className="text-gray-600">
                        Informasi nutrisi dan kesehatan
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200 mb-6">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                      {fruitDetails.manfaat}
                    </p>
                  </div>

                  {fruitDetails.createdAt && (
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Informasi ditambahkan:{" "}
                      {new Date(fruitDetails.createdAt).toLocaleDateString(
                        "id-ID",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </div>
                  )}

                  {/* Save Button with enhanced styling */}
                  {isAuthenticated && user && (
                    <button
                      onClick={() => handleSaveScan(user.id, authToken)}
                      disabled={isSavingScan}
                      className="group relative w-full overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-center">
                        {isSavingScan ? (
                          <>
                            <div className="animate-spin mr-3 h-6 w-6 border-2 border-white border-t-transparent rounded-full"></div>
                            <span className="text-lg">Menyimpan hasil...</span>
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-6 h-6 mr-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                            <span className="text-lg">
                              💾 Simpan Hasil Scan
                            </span>
                          </>
                        )}
                      </div>
                    </button>
                  )}

                  {/* Save Status Messages */}
                  {saveScanSuccess && (
                    <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-xl">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="text-green-700 font-medium">
                          {saveScanSuccess}
                        </p>
                      </div>
                    </div>
                  )}
                  {saveScanError && (
                    <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-xl">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-red-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="text-red-700 font-medium">
                          {saveScanError}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* All Predictions Card */}
              {rawPredictions.length > 0 && (
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
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        📊 Detail Analisis AI
                      </h3>
                      <p className="text-gray-600">
                        Semua kemungkinan hasil deteksi
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {rawPredictions.map((prediction, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-gray-50 to-green-50 p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-800 flex items-center">
                            <span className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                              {index + 1}
                            </span>
                            {prediction.className}
                          </span>
                          <div className="flex items-center">
                            <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                              <div
                                className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-500"
                                style={{
                                  width: `${prediction.probability * 100}%`,
                                }}
                              ></div>
                            </div>
                            <span className="font-bold text-green-600 min-w-[60px] text-right">
                              {(prediction.probability * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="relative z-10 text-center py-8 mt-16">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto border border-white/40 shadow-lg">
          <div className="flex items-center justify-center mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <span className="text-lg font-semibold text-gray-700">
              AI Fruit Scanner
            </span>
          </div>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Powered by Advanced AI Technology
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Hak Cipta Dilindungi - Made with ❤️
          </p>
        </div>
      </footer>
    </div>
  );
}