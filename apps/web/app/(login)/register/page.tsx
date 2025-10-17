"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Đăng ký thất bại");
            }

            alert("Đăng ký thành công! Vui lòng đăng nhập.");
            router.push("/login");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm">
            <form onSubmit={handleRegister} className="flex flex-col gap-3">
                <label htmlFor="name-input">Tên hiển thị</label>
                <input
                    type="text"
                    id="name-input"
                    placeholder="Họ và tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-[#1877f2]"
                />

                <label htmlFor="email-input">Email</label>
                <input
                    type="email"
                    id="email-input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-[#1877f2]"
                />

                <label htmlFor="password-input">Mật khẩu</label>
                <input
                    type="password"
                    id="password-input"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-[#1877f2]"
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#42b72a] text-white font-bold py-2 rounded-md hover:bg-green-600 transition disabled:opacity-60"
                >
                    {loading ? "Đang tạo..." : "Đăng ký"}
                </button>

                <hr className="my-3" />

                <button
                    type="button"
                    onClick={() => router.push("/login")}
                    className="bg-[#1877f2] text-white font-bold py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Đã có tài khoản? Đăng nhập
                </button>
            </form>
        </div>
    );
}
