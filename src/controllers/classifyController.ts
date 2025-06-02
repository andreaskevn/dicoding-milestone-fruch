"use client";

import { useState, useRef } from "react";
import { classifyImage } from "@/lib/imageClassifier";
import type {
  PredictionResult,
  FruitData,
  // SaveScanRequestBody, // Kita tidak akan membuat payload JSON ini lagi untuk sisi klien
  SaveScanApiResponse, // Impor tipe untuk respons API
} from "@/lib/definition";
// import { useAuth } from '@/contexts/AuthContext'; // Sesuaikan jika Anda menggunakan ini

// Fungsi helper untuk mengubah data URI menjadi Blob
async function dataUriToBlob(dataURI: string): Promise<Blob> {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

export function useClassifyAndFetchFruitController() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [rawPredictions, setRawPredictions] = useState<PredictionResult[]>([]);
  const [topPrediction, setTopPrediction] = useState<PredictionResult | null>(
    null
  );
  const [fruitDetails, setFruitDetails] = useState<FruitData | null>(null);

  const [isClassifying, setIsClassifying] = useState<boolean>(false);
  const [isFetchingDetails, setIsFetchingDetails] = useState<boolean>(false);
  const [isSavingScan, setIsSavingScan] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [saveScanError, setSaveScanError] = useState<string | null>(null);
  const [saveScanSuccess, setSaveScanSuccess] = useState<string | null>(null);

  const resetState = (resetImagePreview = false) => {
    if (resetImagePreview) {
      setImagePreview(null);
    }
    setRawPredictions([]);
    setTopPrediction(null);
    setFruitDetails(null);
    setError(null);
    setSaveScanError(null);
    setSaveScanSuccess(null);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      resetState(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // imagePreview adalah data URI base64
      };
      reader.readAsDataURL(file);
    } else {
      resetState(true);
    }
  };

  const processImageAndGetDetails = async () => {
    if (!imageRef.current) {
      setError("Referensi gambar tidak ditemukan.");
      return;
    }

    setSaveScanError(null);
    setSaveScanSuccess(null); 
    setIsClassifying(true);
    setIsFetchingDetails(false);
    resetState(false); // Jangan reset imagePreview di sini

    try {
      const predictions = await classifyImage(imageRef.current);
      setRawPredictions(predictions);

      if (predictions && predictions.length > 0) {
        const highestPrediction = predictions.reduce((prev, current) =>
          prev.probability > current.probability ? prev : current
        );
        setTopPrediction(highestPrediction);

        if (highestPrediction.className) {
          setIsFetchingDetails(true);
          try {
            const encodedFruitName = encodeURIComponent(
              highestPrediction.className
            );
            const res = await fetch(`/api/buah/${encodedFruitName}`);
            if (!res.ok) {
              let errorResponseMessage = `Buah "${highestPrediction.className}" tidak ditemukan atau terjadi kesalahan server (Status: ${res.status}).`;
              try {
                const errorData = await res.json();
                if (errorData && errorData.message) {
                  errorResponseMessage = errorData.message;
                }
              } catch (e) {
                // Tangani jika respons error bukan JSON
              }
              throw new Error(errorResponseMessage);
            }
            const details: FruitData = await res.json();
            setFruitDetails(details);
          } catch (fetchError: any) {
            console.error("Kesalahan saat mengambil detail buah:", fetchError);
            setError(`Gagal mengambil detail buah: ${fetchError.message}`);
            setFruitDetails(null);
          } finally {
            setIsFetchingDetails(false);
          }
        } else {
          setError("Nama kelas dari prediksi teratas tidak ditemukan.");
        }
      } else {
        setError("Tidak ada prediksi yang dihasilkan oleh model.");
      }
    } catch (classifyError: any) {
      console.error("Kesalahan saat klasifikasi gambar:", classifyError);
      setError(`Kesalahan klasifikasi: ${classifyError.message}`);
    } finally {
      setIsClassifying(false);
    }
  };

  const handleSaveScan = async (
    // currentUserId tidak perlu dikirim dalam FormData, karena server mengambilnya dari token
    currentUserId: string | undefined,
    currentAuthToken: string | null // Hanya token yang dibutuhkan untuk header
  ) => {
    // Validasi awal untuk currentAuthToken dan data yang akan disimpan
    if (!currentAuthToken || !currentUserId) {
      setSaveScanError(
        "Pengguna tidak terautentikasi. Silakan login untuk menyimpan."
      );
      return;
    }
    if (!topPrediction || !imagePreview) {
      setSaveScanError("Tidak ada hasil prediksi atau gambar untuk disimpan.");
      return;
    }

    setIsSavingScan(true);
    setSaveScanError(null);
    setSaveScanSuccess(null);

    try {
      // 1. Ubah imagePreview (data URI) menjadi Blob
      const imageBlob = await dataUriToBlob(imagePreview);
      // Buat nama file unik, server mungkin akan membuat nama baru lagi
      const fileExtension = imageBlob.type.split("/")[1] || "png";
      const uniqueFileName = `scan_${Date.now()}.${fileExtension}`;

      // 2. Buat objek FormData
      const formData = new FormData();
      formData.append("imageFile", imageBlob, uniqueFileName); // 'imageFile' harus cocok dengan nama field di backend

      // Tambahkan field lain yang dibutuhkan oleh backend
      if (fruitDetails?.id) {
        formData.append("buahId", fruitDetails.id);
      }
      formData.append("predictedBuahName", topPrediction.className);
      formData.append("probability", String(topPrediction.probability)); // Kirim sebagai string, backend akan parse

      // 3. Kirim request dengan FormData
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: {
          // "Content-Type" JANGAN di-set manual, browser akan menanganinya untuk FormData
          Authorization: `Bearer ${currentAuthToken}`,
        },
        body: formData, // Kirim objek FormData
      });

      const data: SaveScanApiResponse = await response.json(); // Gunakan tipe SaveScanApiResponse

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Gagal menyimpan hasil scan."
        );
      }
      setSaveScanSuccess(data.message || "Hasil scan berhasil disimpan!");
    } catch (error: any) {
      console.error("Error saat menyimpan scan:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat menyimpan.";
      setSaveScanError(errorMessage);
    } finally {
      setIsSavingScan(false);
    }
  };

  return {
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
  };
}
