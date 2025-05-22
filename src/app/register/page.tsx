"use client";

import { useState } from "react";

export default function RegisterPage() {
    const [form, setForm] = useState({ first_name: "", last_name: "", email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        const data = await res.json();
        alert(data.message || "Registered successfully!");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input name="first_name" placeholder="First Name" onChange={handleChange} />
            <input name="last_name" placeholder="Last Name" onChange={handleChange} />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />
            <button type="submit">Register</button>
        </form>
    );
}

//Lanjutin ya hehe, ini masih template
//even blm narik css
