"use client";

// Path impor disesuaikan dengan nama file controller yang benar
import { useClassifyAndFetchFruitController } from "@/controllers/classifyController";
import { useAuth } from '@/context/authContext'; // Pastikan path ini benar
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ClassifyPage() {
    const {
        imagePreview,
        imageRef,
        rawPredictions,
        topPrediction,
        fruitDetails,
        isClassifying,
        isFetchingDetails,
        isSavingScan,     // State baru dari controller
        error,
        saveScanError,    // Error baru
        saveScanSuccess,  // Pesan sukses baru
        handleImageUpload,
        processImageAndGetDetails,
        handleSaveScan,   // Fungsi baru dari controller
    } = useClassifyAndFetchFruitController();

    const { isAuthenticated, isLoadingAuth, user, token: authToken } = useAuth(); // Ambil user dan token
    const router = useRouter();

    useEffect(() => {
        if (isLoadingAuth) {
            return;
        }
        if (!isAuthenticated) {
            router.push('/login?redirect=/classify');
        }
    }, [isAuthenticated, isLoadingAuth, router]);

    if (isLoadingAuth || !isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center p-10">
                    <svg className="animate-spin h-10 w-10 text-indigo-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-lg text-gray-700">Memeriksa status autentikasi...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            <header className="mb-10 text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">
                    Deteksi Kematangan & Manfaat Buah
                </h1>
                {user && (
                    <p className="text-lg text-gray-600 mt-2">
                        Selamat datang, {user.name || user.email}! Unggah gambar buah untuk memulai.
                    </p>
                )}
            </header>

            <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-2xl">
                <div className="mb-6">
                    <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 mb-2">
                        Pilih Gambar Buah:
                    </label>
                    <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100 transition-colors cursor-pointer"
                    />
                </div>

                {imagePreview && (
                    <div className="mt-6 mb-6 flex flex-col items-center">
                        <p className="text-sm text-gray-600 mb-2">Pratinjau Gambar:</p>
                        <img
                            ref={imageRef}
                            src={imagePreview}
                            alt="Pratinjau Gambar Buah"
                            className="w-full max-w-md h-auto object-contain border-2 border-gray-300 rounded-lg shadow-md"
                            onLoad={processImageAndGetDetails}
                        />
                    </div>
                )}

                {(isClassifying || isFetchingDetails) && (
                    <div className="mt-6 text-center p-4">
                        <div className="flex items-center justify-center text-indigo-600">
                            <svg className="animate-spin -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="text-lg">
                                {isClassifying ? "Mengklasifikasikan gambar..." : isFetchingDetails ? "Mengambil detail buah..." : "Memproses..."}
                            </p>
                        </div>
                    </div>
                )}

                {error && !isClassifying && !isFetchingDetails && (
                    <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md" role="alert">
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

                {topPrediction && !isClassifying && !isFetchingDetails && !error && (
                    <div className="mt-8 p-6 border border-indigo-200 rounded-lg bg-indigo-50 shadow-lg">
                        <h2 className="text-2xl font-bold text-indigo-700 mb-3">
                            Hasil Deteksi: {topPrediction.className}
                        </h2>
                        <p className="text-gray-700">
                            Probabilitas: <span className="font-semibold">{(topPrediction.probability * 100).toFixed(2)}%</span>
                        </p>
                    </div>
                )}

                {fruitDetails && !isClassifying && !isFetchingDetails && !error && (
                    <div className="mt-6 p-6 border border-green-200 rounded-lg bg-green-50 shadow-lg">
                        <h3 className="text-xl font-semibold text-green-700 mb-2">
                            Manfaat {fruitDetails.namaBuah}:
                        </h3>
                        <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
                            {fruitDetails.manfaat}
                        </p>
                        {fruitDetails.createdAt && (
                            <p className="text-xs text-gray-400 mt-4">
                                Informasi ditambahkan: {new Date(fruitDetails.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        )}
                        {/* Tombol Simpan Hasil Scan */}
                        {isAuthenticated && user && ( // Hanya tampilkan jika user login
                            <button
                                onClick={() => handleSaveScan(user.id, authToken)} // Kirim user.id dan token dari AuthContext
                                disabled={isSavingScan}
                                className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg 
                           text-base font-medium text-white bg-blue-600 hover:bg-blue-700 
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                           disabled:bg-gray-400 disabled:cursor-not-allowed 
                           transition-all duration-150 ease-in-out"
                            >
                                {isSavingScan ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Menyimpan...
                                    </div>
                                ) : (
                                    'Simpan Hasil Scan Ini'
                                )}
                            </button>
                        )}
                        {saveScanSuccess && <p className="mt-3 text-sm text-center text-green-600 bg-green-100 p-2 rounded-md">{saveScanSuccess}</p>}
                        {saveScanError && <p className="mt-3 text-sm text-center text-red-600 bg-red-100 p-2 rounded-md">{saveScanError}</p>}
                    </div>
                )}

                {rawPredictions.length > 0 && !isClassifying && !isFetchingDetails && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Semua Kemungkinan:</h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                            {rawPredictions.map((p, index) => (
                                <li key={index}>
                                    {p.className}: {(p.probability * 100).toFixed(2)}%
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <footer className="text-center mt-12 py-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Aplikasi Deteksi Buah. Hak Cipta Dilindungi.</p>
            </footer>
        </div>
    );
}
