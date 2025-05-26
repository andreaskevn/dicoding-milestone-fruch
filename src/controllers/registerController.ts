// src/controllers/registerController.ts
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterFormState, RegisterApiResponse } from "@/lib/definition";

export function useRegisterController() {
  const [form, setForm] = useState<RegisterFormState>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    // Validasi Frontend Sederhana
    if (!form.first_name || !form.email || !form.password) {
      setError("Nama depan, email, dan password wajib diisi.");
      setIsLoading(false);
      return;
    }
    if (form.password.length < 6) {
      setError("Password minimal harus 6 karakter.");
      setIsLoading(false);
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      setIsLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...apiFormData } = form;

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiFormData),
      });

      const data: RegisterApiResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Terjadi kesalahan saat registrasi.");
      }

      setSuccessMessage(data.message || "Registrasi berhasil! Silakan login.");
      setForm({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      console.error("Registrasi gagal (client-side):", err);
      setError(err.message || "Terjadi kesalahan yang tidak diketahui.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    error,
    successMessage,
    handleChange,
    handleSubmit,
  };
}
