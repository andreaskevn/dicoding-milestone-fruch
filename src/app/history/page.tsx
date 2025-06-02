"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Image from "next/image";
import ScanDetailModal from "@/components/ScanDetailModal";
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

export default function HistoryPage() {
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedScan, setSelectedScan] = useState<ScanResult | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

  // Untuk hapus
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isDeleting, setIsDeleting] = useState(false);

  const { isAuthenticated, isLoadingAuth, user, token } = useAuth();
  const router = useRouter();
  const observer = useRef<IntersectionObserver | null>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const itemsPerPage = 9;

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

  // Intersection Observer for scroll animations
  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-scan-id");
          if (id) {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set([...prev, id]));
            } else {
              setVisibleItems((prev) => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
              });
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px 0px -50px 0px",
      }
    );

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  // Observe card elements
  useEffect(() => {
    const currentObserver = observer.current;
    if (currentObserver) {
      cardRefs.current.forEach((card) => {
        currentObserver.observe(card);
      });
    }

    return () => {
      if (currentObserver) {
        cardRefs.current.forEach((card) => {
          currentObserver.unobserve(card);
        });
      }
    };
  }, [scanHistory, currentPage]);

  const fetchScanHistory = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/scan", {
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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan saat mengambil riwayat scan",
        confirmButtonColor: "#059669",
        showCancelButton: true,
        confirmButtonText: "Coba Lagi",
        cancelButtonText: "Tutup",
      }).then((result) => {
        if (result.isConfirmed) {
          fetchScanHistory();
        }
      });
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

  // Toggle delete mode
  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
    setSelectedItems(new Set()); // Clear selected items when toggling
  };

  // Handle item selection
  const toggleItemSelection = (scanId: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(scanId)) {
        newSet.delete(scanId);
      } else {
        newSet.add(scanId);
      }
      return newSet;
    });
  };

  // Select all items on current page
  const selectAllCurrentPage = () => {
    const currentItemIds = currentItems.map((item) => item.id);
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      currentItemIds.forEach((id) => newSet.add(id));
      return newSet;
    });
  };

  // Deselect all items
  const deselectAll = () => {
    setSelectedItems(new Set());
  };

  // Delete individual scan via API
  const deleteSingleScan = async (scanId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/scan/${scanId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menghapus scan");
      }

      return true;
    } catch (error) {
      console.error("Error deleting scan:", error);
      return false;
    }
  };

  const deleteSelectedItems = async () => {
    if (selectedItems.size === 0) return;

    const confirmDelete = await Swal.fire({
      icon: "warning",
      title: "Konfirmasi Hapus",
      html: `Apakah Anda yakin ingin menghapus <strong>${selectedItems.size}</strong> item yang dipilih?`,
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
      reverseButtons: true,
      focusCancel: true,
    });

    if (!confirmDelete) return;

    try {
      setIsDeleting(true);

      // Convert Set to Array for deletion
      const itemsToDelete = Array.from(selectedItems);

      // Keep track of successful and failed deletions
      const deletionPromises = itemsToDelete.map(async (scanId) => {
        const success = await deleteSingleScan(scanId);
        return { scanId, success };
      });

      const deletionResults = await Promise.all(deletionPromises);

      // Separate successful and failed deletions
      const successfulDeletions = deletionResults
        .filter((result) => result.success)
        .map((result) => result.scanId);

      const failedDeletions = deletionResults
        .filter((result) => !result.success)
        .map((result) => result.scanId);

      // Update local state by removing successfully deleted items
      if (successfulDeletions.length > 0) {
        setScanHistory((prevHistory) =>
          prevHistory.filter((item) => !successfulDeletions.includes(item.id))
        );
      }

      // Clear selections and exit delete mode
      setSelectedItems(new Set());
      setIsDeleteMode(false);

      // Adjust current page if needed
      const remainingItems = scanHistory.length - successfulDeletions.length;
      const newTotalPages = Math.ceil(remainingItems / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }

      // Show result message
      if (failedDeletions.length > 0) {
        Swal.fire({
          icon: "warning",
          title: "Hapus Sebagian Berhasil",
          html: `
            <div class="text-left">
              <p><strong class="text-green-600">${successfulDeletions.length}</strong> item berhasil dihapus</p>
              <p><strong class="text-red-600">${failedDeletions.length}</strong> item gagal dihapus</p>
              <br>
              <small class="text-gray-500">Silakan coba lagi untuk item yang gagal dihapus.</small>
            </div>
          `,
          confirmButtonColor: "#059669",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Berhasil Dihapus!",
          text: `${successfulDeletions.length} item berhasil dihapus.`,
          confirmButtonColor: "#059669",
          confirmButtonText: "OK",
          timer: 3000,
          timerProgressBar: true,
        });
      }
    } catch (err) {
      console.error("Error deleting items:", err);
      Swal.fire({
        icon: "error",
        title: "Gagal Menghapus",
        text: "Terjadi kesalahan saat menghapus item. Silakan coba lagi.",
        confirmButtonColor: "#059669",
        confirmButtonText: "OK",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(scanHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = scanHistory.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Clear visible items when changing page
    setVisibleItems(new Set());
    // Scroll to top of results
    const resultsSection = document.getElementById("results-section");
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const setCardRef = (id: string, element: HTMLDivElement | null) => {
    if (element) {
      cardRefs.current.set(id, element);
    } else {
      cardRefs.current.delete(id);
    }
  };

  if (isLoadingAuth || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900">
        <div className="text-center p-10 bg-white/10 bg-opacity-10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl">
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
          <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 mb-4 break-words leading-tight">
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
            <span className="ml-4 text-lg text-emerald-700 font-medium">
              Memuat riwayat...
            </span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md">
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
                  Terjadi kesalahan
                </h3>
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
              <svg
                className="w-12 h-12 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M12 18v-6M9 15h6"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Belum Ada Riwayat Scan
            </h2>
            <p className="text-gray-600 mb-6">
              Anda belum menyimpan hasil scan buah apapun. Mulai scan buah dan
              simpan hasilnya untuk melihat riwayat di sini.
            </p>
            <button
              onClick={() => router.push("/classify")}
              className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors inline-flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Mulai Scan Buah
            </button>
          </div>
        ) : (
          <div id="results-section">
            {/* Control Bar */}
            <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 rounded-2xl shadow-lg border border-emerald-100/50 p-6 mb-6 backdrop-blur-sm">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-2xl">
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-emerald-100/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-emerald-200/30 rounded-full blur-xl"></div>
              </div>

              {/* Mobile Layout */}
              <div className="block lg:hidden space-y-5 relative z-10">
                {/* Page Info */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full shadow-lg">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="text-sm font-bold">
                      Halaman {currentPage} dari {totalPages}
                    </span>
                  </div>
                </div>
                {/* Delete Mode Toggle */}
                <div className="flex items-center justify-center space-x-4 py-4 px-6 bg-white/60 backdrop-blur-sm rounded-xl border border-emerald-200/50 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-emerald-600"
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
                    <span className="text-sm font-semibold text-gray-800">
                      Mode Hapus
                    </span>
                  </div>
                  <button
                    onClick={toggleDeleteMode}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 shadow-lg ${
                      isDeleteMode
                        ? "bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-emerald-200"
                        : "bg-gradient-to-r from-gray-300 to-gray-400 shadow-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-all duration-300 shadow-lg ${
                        isDeleteMode
                          ? "translate-x-7 rotate-180"
                          : "translate-x-1"
                      }`}
                    >
                      <div
                        className={`w-full h-full rounded-full transition-colors duration-300 ${isDeleteMode ? "bg-emerald-100" : "bg-gray-100"}`}
                      ></div>
                    </span>
                  </button>
                </div>

                {/* Delete Actions */}
                {isDeleteMode && (
                  <div className="space-y-4 animate-slideUp">
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={selectAllCurrentPage}
                        className="group px-5 py-2.5 text-sm bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 rounded-xl hover:from-emerald-100 hover:to-emerald-200 transition-all duration-300 border border-emerald-300/50 font-semibold shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="w-4 h-4 group-hover:scale-110 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Pilih Semua
                        </span>
                      </button>
                      <button
                        onClick={deselectAll}
                        className="group px-5 py-2.5 text-sm bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all duration-300 border border-gray-300/50 font-semibold shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="w-4 h-4 group-hover:scale-110 transition-transform"
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
                          Batal Pilih
                        </span>
                      </button>
                    </div>
                    {selectedItems.size > 0 && (
                      <div className="flex justify-center animate-slideUp">
                        <button
                          onClick={deleteSelectedItems}
                          disabled={isDeleting}
                          className="group px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg hover:shadow-xl font-semibold transform hover:-translate-y-1 disabled:transform-none"
                        >
                          {isDeleting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Menghapus...</span>
                            </>
                          ) : (
                            <>
                              <svg
                                className="w-5 h-5 group-hover:scale-110 transition-transform"
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
                              <span>Hapus ({selectedItems.size})</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:flex justify-between items-center relative z-10">
                <div className="flex items-center space-x-8">
                  <div className="flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full shadow-lg">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="text-sm font-bold">
                      Halaman {currentPage} dari {totalPages}
                    </span>
                  </div>
                  {/* Delete Mode Toggle */}
                  <div className="flex items-center space-x-4 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-xl border border-emerald-200/50 shadow-sm">
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-5 h-5 text-emerald-600"
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
                      <span className="text-sm font-semibold text-gray-800">
                        Mode Hapus
                      </span>
                    </div>
                    <button
                      onClick={toggleDeleteMode}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 shadow-lg ${
                        isDeleteMode
                          ? "bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-emerald-200"
                          : "bg-gradient-to-r from-gray-300 to-gray-400 shadow-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-all duration-300 shadow-lg ${
                          isDeleteMode
                            ? "translate-x-7 rotate-180"
                            : "translate-x-1"
                        }`}
                      >
                        <div
                          className={`w-full h-full rounded-full transition-colors duration-300 ${isDeleteMode ? "bg-emerald-100" : "bg-gray-100"}`}
                        ></div>
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {isDeleteMode && (
                    <div className="flex items-center space-x-3 animate-fadeIn">
                      <button
                        onClick={selectAllCurrentPage}
                        className="group px-5 py-2.5 text-sm bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 rounded-xl hover:from-emerald-100 hover:to-emerald-200 transition-all duration-300 border border-emerald-300/50 font-semibold shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                      >
                        <span className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 group-hover:scale-110 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Pilih Semua
                        </span>
                      </button>
                      <button
                        onClick={deselectAll}
                        className="group px-5 py-2.5 text-sm bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all duration-300 border border-gray-300/50 font-semibold shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                      >
                        <span className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 group-hover:scale-110 transition-transform"
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
                          Batal Pilih
                        </span>
                      </button>
                      {selectedItems.size > 0 && (
                        <button
                          onClick={deleteSelectedItems}
                          disabled={isDeleting}
                          className="group px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg hover:shadow-xl font-semibold transform hover:-translate-y-1 disabled:transform-none animate-ping"
                        >
                          {isDeleting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Menghapus...</span>
                            </>
                          ) : (
                            <>
                              <svg
                                className="w-5 h-5 group-hover:scale-110 transition-transform"
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
                              <span>Hapus ({selectedItems.size})</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Scan Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentItems.map((scan, index) => (
                <div
                  key={scan.id}
                  ref={(el) => setCardRef(scan.id, el)}
                  data-scan-id={scan.id}
                  className={`scan-card bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] cursor-pointer relative ${
                    visibleItems.has(scan.id)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  } ${isDeleteMode && selectedItems.has(scan.id) ? "ring-4 ring-emerald-500" : ""}`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                  onClick={() => {
                    if (isDeleteMode) {
                      toggleItemSelection(scan.id);
                    } else {
                      openScanDetail(scan);
                    }
                  }}
                >
                  {/* Checkbox in delete mode */}
                  {isDeleteMode && (
                    <div className="absolute top-4 left-4 z-10">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedItems.has(scan.id)
                            ? "bg-emerald-500 border-emerald-500"
                            : "bg-white border-gray-300 hover:border-emerald-500"
                        }`}
                      >
                        {selectedItems.has(scan.id) && (
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="relative h-48 w-full">
                    {scan.imageUrl ? (
                      <Image
                        src={scan.imageUrl}
                        alt={scan.predictedBuahName}
                        fill
                        className="object-contain"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 bg-emerald-100 flex items-center justify-center">
                        <svg
                          className="w-16 h-16 text-emerald-300"
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
                    <div className="absolute top-0 right-0 bg-emerald-600 text-white px-3 py-1 rounded-bl-lg font-medium text-sm">
                      {(scan.probability * 100).toFixed(1)}%
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {scan.predictedBuahName}
                    </h3>

                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <svg
                        className="w-4 h-4 mr-1"
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

                    <div className="flex items-center text-sm text-gray-500">
                      <svg
                        className="w-4 h-4 mr-1"
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
              ))}
            </div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-emerald-200/30 shadow-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <p className="text-gray-700 text-sm font-medium">
                  Menampilkan{" "}
                  <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    {startIndex + 1}-{Math.min(endIndex, scanHistory.length)}
                  </span>{" "}
                  dari{" "}
                  <span className="font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-md">
                    {scanHistory.length}
                  </span>{" "}
                  hasil scan
                </p>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                {/* Previous Button */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-emerald-600 hover:bg-emerald-50 border border-emerald-200"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => {
                    // Show first page, last page, current page, and pages around current page
                    const showPage =
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 1;

                    if (!showPage && page === 2 && currentPage > 4) {
                      return (
                        <span
                          key="ellipsis-start"
                          className="px-2 text-gray-400"
                        >
                          ...
                        </span>
                      );
                    }
                    if (
                      !showPage &&
                      page === totalPages - 1 &&
                      currentPage < totalPages - 3
                    ) {
                      return (
                        <span key="ellipsis-end" className="px-2 text-gray-400">
                          ...
                        </span>
                      );
                    }
                    if (!showPage) {
                      return null;
                    }

                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          currentPage === page
                            ? "bg-emerald-600 text-white"
                            : "bg-white text-emerald-600 hover:bg-emerald-50 border border-emerald-200"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }
                )}

                {/* Next Button */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-emerald-600 hover:bg-emerald-50 border border-emerald-200"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

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
          <p className="text-xs text-gray-400 mt-1">Hak Cipta Dilindungi</p>
        </div>
      </footer>

      {/* Scan Detail Modal */}
      {selectedScan && (
        <ScanDetailModal scan={selectedScan} onClose={closeScanDetail} />
      )}

      {/* Enhanced animation styles */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes ping {
          0% {
            transform: scale(0.5);
            opacity: 0;
          },
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-ping {
          animation: ping 1s;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .scan-card {
          transition:
            opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .scan-card:hover {
          transform: translateY(-4px) scale(1.02);
        }

        .scan-card.opacity-0 {
          opacity: 0;
          transform: translateY(32px);
        }

        .scan-card.opacity-100 {
          opacity: 1;
          transform: translateY(0px);
        }
      `}</style>
    </div>
  );
}
