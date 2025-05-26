'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

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
}

export default function ScanDetailModal({ scan, onClose }: ScanDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [fruitDetails, setFruitDetails] = useState<FruitData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Close modal when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Close modal when pressing Escape key
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
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
      
      const response = await fetch(`/api/buah/${encodeURIComponent(fruitName)}`);
      
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

  if (!scan) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div 
        ref={modalRef}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden animate-fade-in my-8"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800">Detail Hasil Scan</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image */}
            <div className="w-full md:w-1/2 relative h-64 md:h-auto">
              {scan.imageUrl ? (
                <div className="relative h-64 md:h-full w-full rounded-xl overflow-hidden">
                  <Image
                    src={scan.imageUrl}
                    alt={scan.predictedBuahName}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-64 md:h-full w-full bg-emerald-100 rounded-xl flex items-center justify-center">
                  <svg className="w-20 h-20 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            
            {/* Details */}
            <div className="w-full md:w-1/2">
              <div className="mb-6">
                <h4 className="text-sm text-gray-500 mb-1">Nama Buah</h4>
                <p className="text-2xl font-bold text-gray-800">{scan.predictedBuahName}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm text-gray-500 mb-1">Tingkat Kepercayaan</h4>
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-3 mr-3">
                    <div
                      className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full"
                      style={{ width: `${scan.probability * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xl font-bold text-emerald-600">
                    {(scan.probability * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm text-gray-500 mb-1">Waktu Scan</h4>
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(scan.scannedAt).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                <div className="flex items-center text-gray-700 mt-2">
                  <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {new Date(scan.scannedAt).toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm text-gray-500 mb-1">ID Scan</h4>
                <p className="text-gray-700 font-mono text-sm bg-gray-50 p-2 rounded-lg">{scan.id}</p>
              </div>
            </div>
          </div>
          
          {/* Fruit Benefits Section */}
          <div className="mt-8 border-t border-gray-100 pt-6">
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Manfaat {scan.predictedBuahName}
            </h4>
            
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-2 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mr-3"></div>
                <p className="text-gray-600">Memuat informasi manfaat...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-red-600">Gagal memuat informasi manfaat: {error}</p>
              </div>
            ) : fruitDetails ? (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-100">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {fruitDetails.manfaat}
                </p>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">Informasi manfaat tidak tersedia.</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 p-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}