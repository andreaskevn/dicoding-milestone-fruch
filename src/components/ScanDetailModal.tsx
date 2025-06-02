"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";

interface ScanResult {
  id: string;
  userId: string;
  buahId: string | null;
  predictedBuahName: string;
  probability: number;
  imageUrl: string;
  scannedAt: string;
}

interface FruitData {
  id: string;
  namaBuah: string;
  manfaat: string;
  createdAt: string;
  updatedAt: string;
}

interface ScanDetailModalProps {
  scan: ScanResult | null;
  onClose: () => void;
  onDelete?: (scanId: string) => void;
}

export default function ScanDetailModal({
  scan,
  onClose,
  onDelete
}: ScanDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [fruitDetails, setFruitDetails] = useState<FruitData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    // Close modal when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    // Close modal when pressing Escape key
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);

  useEffect(() => {
    if (scan) {
      fetchFruitDetails(scan.predictedBuahName);
    }
  }, [scan]);

  const fetchFruitDetails = async (fruitName: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `/api/buah/${encodeURIComponent(fruitName)}`
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil detail buah");
      }

      const data = await response.json();
      setFruitDetails(data);
    } catch (err) {
      console.error("Error fetching fruit details:", err);
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  // if (!scan) return null;

  const handleDelete = async () => {
    if (!scan) return;

    try {
      setIsDeleting(true);

      // Try multiple possible token storage keys
      let token = localStorage.getItem('token') ||
        localStorage.getItem('authToken') ||
        localStorage.getItem('accessToken') ||
        localStorage.getItem('jwt');

      // Also try sessionStorage as fallback
      if (!token) {
        token = sessionStorage.getItem('token') ||
          sessionStorage.getItem('authToken') ||
          sessionStorage.getItem('accessToken') ||
          sessionStorage.getItem('jwt');
      }

      if (!token) {
        const response = await fetch(`/api/scan/${scan.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Sesi Anda telah berakhir. Silakan login kembali.');
          }
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Gagal menghapus riwayat scan');
        }
      } else {
        // Try with authorization header
        const response = await fetch(`/api/scan/${scan.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Token might be expired, try without it
            const retryResponse = await fetch(`/api/scan/${scan.id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (!retryResponse.ok) {
              throw new Error('Sesi Anda telah berakhir. Silakan login kembali.');
            }
          } else {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Gagal menghapus riwayat scan');
          }
        }
      }

      // Success alert
      await Swal.fire({
        title: 'Berhasil!',
        text: 'Riwayat scan berhasil dihapus',
        icon: 'success',
        confirmButtonColor: '#10b981',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'rounded-xl',
          title: 'text-lg font-bold',
          confirmButton: 'rounded-lg px-6 py-2 font-medium'
        }
      });

      // Panggil callback untuk refresh data dan tutup modal
      if (onDelete) {
        onDelete(scan.id);
      }
      onClose();

    } catch (err) {
      console.error('Error deleting scan:', err);
      await Swal.fire({
        title: 'Gagal!',
        text: err instanceof Error ? err.message : 'Gagal menghapus riwayat scan',
        icon: 'error',
        confirmButtonColor: '#ef4444',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'rounded-xl',
          title: 'text-lg font-bold',
          confirmButton: 'rounded-lg px-6 py-2 font-medium'
        }
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (!scan) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div
        ref={modalRef}
        className="bg-white w-full h-full sm:h-auto sm:rounded-3xl sm:shadow-2xl sm:max-w-3xl sm:mx-4 sm:my-8 overflow-hidden animate-fade-in flex flex-col sm:block"
      >
        {/* Header - Mobile optimized */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h3 className="text-lg sm:text-2xl font-bold text-gray-800">
            Detail Hasil Scan
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-2 sm:p-0 -m-2 sm:m-0"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content - Mobile scrollable */}
        <div className="flex-1 overflow-y-auto sm:overflow-visible">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:gap-6">
              {/* Image Section - Mobile full width */}
              <div className="w-full sm:w-1/2">
                {scan.imageUrl ? (
                  <div className="relative h-48 sm:h-64 w-full rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                    <Image
                      src={scan.imageUrl}
                      alt={scan.predictedBuahName}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                ) : (
                  <div className="h-48 sm:h-64 w-full bg-emerald-100 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-16 sm:w-20 h-16 sm:h-20 text-emerald-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Details Section - Mobile stacked */}
              <div className="w-full space-y-4 sm:space-y-6">
                {/* Fruit Name */}
                <div>
                  <h4 className="text-xs sm:text-sm text-gray-500 mb-1">
                    Nama Buah
                  </h4>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">
                    {scan.predictedBuahName}
                  </p>
                </div>

                {/* Confidence Level */}
                <div>
                  <h4 className="text-xs sm:text-sm text-gray-500 mb-2">
                    Tingkat Kepercayaan
                  </h4>
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 sm:h-3 mr-3">
                      <div
                        className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 sm:h-3 rounded-full transition-all duration-300"
                        style={{ width: `${scan.probability * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-lg sm:text-xl font-bold text-emerald-600 min-w-fit">
                      {(scan.probability * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Scan Time */}
                <div>
                  <h4 className="text-xs sm:text-sm text-gray-500 mb-2">
                    Waktu Scan
                  </h4>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="flex items-center text-sm sm:text-base text-gray-700">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-emerald-500 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {new Date(scan.scannedAt).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center text-sm sm:text-base text-gray-700">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-emerald-500 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {new Date(scan.scannedAt).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>

                {/* Scan ID */}
                <div>
                  <h4 className="text-xs sm:text-sm text-gray-500 mb-1">
                    ID Scan
                  </h4>
                  <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                    <p className="text-gray-700 font-mono text-xs sm:text-sm break-all">
                      {scan.id}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fruit Benefits Section - Mobile optimized */}
            <div className="mt-6 sm:mt-8 border-t border-gray-100 pt-4 sm:pt-6">
              <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4 flex items-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-emerald-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Manfaat {scan.predictedBuahName}
              </h4>

              {isLoading ? (
                <div className="flex items-center justify-center py-6 sm:py-8">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mr-3"></div>
                  <p className="text-sm sm:text-base text-gray-600">
                    Memuat informasi manfaat...
                  </p>
                </div>
              ) : error ? (
                <div className="bg-red-50 p-3 sm:p-4 rounded-lg">
                  <p className="text-sm sm:text-base text-red-600">
                    Gagal memuat informasi manfaat: {error}
                  </p>
                </div>
              ) : fruitDetails ? (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-5 rounded-xl border border-green-100">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {fruitDetails.manfaat}
                  </p>
                </div>
              ) : (
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <p className="text-sm sm:text-base text-gray-600">
                    Informasi manfaat tidak tersedia.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl p-6 mx-4 max-w-md w-full">
              <div className="flex items-center mb-4">
                <svg
                  className="w-6 h-6 text-red-500 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <h3 className="text-lg font-bold text-gray-800">Konfirmasi Hapus</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Apakah Anda yakin ingin menghapus riwayat scan untuk "{scan.predictedBuahName}"?
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors font-medium"
                  disabled={isDeleting}
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Menghapus...
                    </>
                  ) : (
                    'Ya, Hapus'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer - Mobile sticky */}
        <div className="bg-gray-50 p-4 sm:p-6 border-t border-gray-100 sticky bottom-0 sm:static">
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isDeleting}
              className="px-6 py-3 sm:px-4 sm:py-2 bg-red-200 hover:bg-red-300 text-red-800 rounded-lg transition-colors text-sm sm:text-base font-medium w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-red-800 border-t-transparent rounded-full animate-spin mr-2"></div>
                  Menghapus...
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Hapus
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 sm:px-4 sm:py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors text-sm sm:text-base font-medium w-full sm:w-auto"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
