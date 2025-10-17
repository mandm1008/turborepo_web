import type { Metadata } from "next";
import { FaFacebook } from "react-icons/fa";

export const metadata: Metadata = {
    title: "Login page | Fakebook",
}

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-black flex items-center justify-center min-h-screen">
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
                {children}
            </div>
        </div>
    );
}
