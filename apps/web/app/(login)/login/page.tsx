"use client";

import { useState, useEffect } from "react";
import { FaFacebook } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const { data: session, status } = useSession();


    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
        }
    }, [status, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res?.error) {
            setError("Sai email hoặc mật khẩu!");
        } else {
            router.push("/");
        }
    };

    return (
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-5xl px-6 text-black">
            {/* Left side */}
            <div className="flex flex-col justify-center mb-10 lg:mb-0 lg:w-1/2">
                <h1 className="text-[#1877f2] text-6xl font-bold mb-4">
                    <FaFacebook size={60} />
                </h1>
                <p className="text-2xl text-white">
                    Fakebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.
                </p>
            </div>

            {/* Right side - Login form */}
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm">
                <form onSubmit={handleLogin} className="flex flex-col gap-3">
                    <label htmlFor="email-input">Email hoặc SĐT</label>
                    <input
                        type="text"
                        id="email-input"
                        placeholder="Email hoặc số điện thoại"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-[#1877f2]"
                    />

                    <label htmlFor="password-input">Password</label>
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
                        className="bg-[#1877f2] text-white text-lg font-bold py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Đăng nhập
                    </button>

                    <a
                        href="#"
                        className="text-[#1877f2] text-sm text-center mt-2 hover:underline"
                    >
                        Quên mật khẩu?
                    </a>

                    <hr className="my-3" />

                    <button
                        type="button"
                        className="bg-[#42b72a] text-white font-bold py-2 rounded-md hover:bg-green-600 transition"
                    >
                        Tạo tài khoản mới
                    </button>
                </form>
            </div>
        </div>
    );
}
