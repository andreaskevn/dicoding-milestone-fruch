"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  LoginFormState,
  LoginApiResponse,
  UserSafeData,
} from "@/lib/definition";
import { useAuth } from "@/context/authContext";

export function useLoginController() {
  const [form, setForm] = useState<LoginFormState>({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const auth = useAuth(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!form.email || !form.password) {
      setError("Email dan password wajib diisi.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data: LoginApiResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Terjadi kesalahan saat login.");
      }

      if (data.user && data.token) {
        auth.login(data.user as UserSafeData, data.token);
        // alert(data.message || "Login berhasil!");
        const redirectPath = searchParams.get("redirect");
        console.log("redirectPath:", redirectPath);

        if (redirectPath) {
          router.push(redirectPath);
        } else {
          router.push("/"); 
        }
      } else {
        setError(
          data.message || "Login gagal, respons tidak sesuai dari server."
        );
      }
    } catch (err: any) {
      console.error("Login gagal:", err);
      setError(err.message || "Terjadi kesalahan yang tidak diketahui.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    error,
    handleChange,
    handleSubmit,
  };
}
