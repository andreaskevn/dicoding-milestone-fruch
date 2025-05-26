"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Image from "next/image";
import ScanDetailModal from "@/components/ScanDetailModal";

interface ScanResult {
  id: string;
  userId: string;
  buahId: string | null;
  predictedBuahName: string;
  probability: number;
  imageUrl: string;
  scannedAt: string;
}

export default function HistoryPage() {
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedScan, setSelectedScan] = useState<ScanResult | null>(null);
  const { isAuthenticated, isLoadingAuth, user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoadingAuth) {
      return;
    }
    if (!isAuthenticated) {
      router.push("/login?redirect=/history");
    }
  }, [isAuthenticated, isLoadingAuth, router]);

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchScanHistory();
    }
  }, [isAuthenticated, token]);

  const fetchScanHistory = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch("/api/scan/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil riwayat scan");
      }

      const data = await response.json();
      setScanHistory(data.scans || []);
    } catch (err) {
      console.error("Error fetching scan history:", err);
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  const openScanDetail = (scan: ScanResult) => {
    setSelectedScan(scan);
  };

  const closeScanDetail = () => {
    setSelectedScan(null);
  };

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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 mb-4">
            Riwayat Scan Buah
          </h1>
          <p className="text-xl text-gray-600 mb-2 font-medium">
            Lihat hasil scan buah yang telah Anda simpan
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-emerald-400 rounded-full animate-ping opacity-20"></div>
            </div>
            <span className="ml-4 text-lg text-emerald-700 font-medium">Memuat riwayat...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-red-800">Terjadi kesalahan</h3>
                <p className="text-red-700 mt-1">{error}</p>
                <button 
                  onClick={fetchScanHistory}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Coba Lagi
                </button>
              </div>
            </div>
          </div>
        ) : scanHistory.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M12 18v-6M9 15h6" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Belum Ada Riwayat Scan</h2>
            <p className="text-gray-600 mb-6">
              Anda belum menyimpan hasil scan buah apapun. Mulai scan buah dan simpan hasilnya untuk melihat riwayat di sini.
            </p>
            <button
              onClick={() => router.push('/classify')}
              className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Mulai Scan Buah
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scanHistory.map((scan) => (
              <div 
                key={scan.id} 
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.02] cursor-pointer"
                onClick={() => openScanDetail(scan)}
              >
                <div className="relative h-48 w-full">
                  {scan.imageUrl ? (
                    <Image
                      src={scan.imageUrl}
                      alt={scan.predictedBuahName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-emerald-100 flex items-center justify-center">
                      <svg className="w-16 h-16 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-0 right-0 bg-emerald-600 text-white px-3 py-1 rounded-bl-lg font-medium text-sm">
                    {(scan.probability * 100).toFixed(1)}%
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {scan.predictedBuahName}
                  </h3>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(scan.scannedAt).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {new Date(scan.scannedAt).toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scan Detail Modal */}
      {selectedScan && (
        <ScanDetailModal scan={selectedScan} onClose={closeScanDetail} />
      )}

      {/* Add animation styles */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}