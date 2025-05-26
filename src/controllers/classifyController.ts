"use client";

import { useState, useRef } from "react";
import { classifyImage } from "@/lib/imageClassifier";
import type {
  PredictionResult,
  FruitData,
  SaveScanRequestBody,
} from "@/lib/definition";
// import { useAuth } from '@/contexts/AuthContext';

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
        setImagePreview(reader.result as string);
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
    resetState(false);

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
            console.log(
              "Mencoba fetch ke URL:",
              `/api/buah/${encodedFruitName}`
            );
            const res = await fetch(`/api/buah/${encodedFruitName}`);
            console.log(
              `Respons fetch untuk ${encodedFruitName}:`,
              res.status,
              res.statusText
            );

            if (!res.ok) {
              let errorResponseMessage = `Buah "${highestPrediction.className}" tidak ditemukan atau terjadi kesalahan server (Status: ${res.status}).`;
              try {
                const errorData = await res.json();
                if (errorData && errorData.message) {
                  errorResponseMessage = errorData.message;
                }
              } catch (e) {
                const textError = await res.text();
                console.error(
                  "Respons error bukan JSON:",
                  textError.substring(0, 200)
                );
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
    currentUserId: string | undefined,
    currentAuthToken: string | null
  ) => {
    if (!currentUserId || !currentAuthToken) {
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

    const payload: Omit<SaveScanRequestBody, "userId"> = {
      buahId: fruitDetails?.id,
      predictedBuahName: topPrediction.className,
      probability: topPrediction.probability,
      imageUrl: imagePreview,
    };

    try {
      console.log("Mengirim payload untuk simpan scan:", payload);
      const response = await fetch("/api/buah", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentAuthToken}`,
        },
        body: JSON.stringify(payload),
      });
      console.log("Respons simpan scan:", response.status, response.statusText);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal menyimpan hasil scan.");
      }
      setSaveScanSuccess(data.message || "Hasil scan berhasil disimpan!");
    } catch (error: any) {
      console.error("Error saat menyimpan scan:", error);
      setSaveScanError(error.message || "Terjadi kesalahan saat menyimpan.");
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
