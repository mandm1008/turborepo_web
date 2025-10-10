"use client";

import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

type FooterProps = {
    type?: "full" | "mini";
};

export default function Footer({ type = "full" }: FooterProps) {
    return (
        <footer className="bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                {type === "full" && (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {/* Cột 1 - Logo + intro */}
                        <div>
                            <h2 className="text-xl font-bold text-blue-600 flex items-center gap-2">
                                <FaFacebook /> MyApp
                            </h2>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Xây dựng kết nối, chia sẻ khoảnh khắc và khám phá thế giới quanh
                                bạn.
                            </p>
                        </div>

                        {/* Cột 2 - Liên kết */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                Liên kết nhanh
                            </h3>
                            <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                <li>
                                    <a href="/about" className="hover:text-blue-600">
                                        Giới thiệu
                                    </a>
                                </li>
                                <li>
                                    <a href="/contact" className="hover:text-blue-600">
                                        Liên hệ
                                    </a>
                                </li>
                                <li>
                                    <a href="/privacy" className="hover:text-blue-600">
                                        Chính sách bảo mật
                                    </a>
                                </li>
                                <li>
                                    <a href="/terms" className="hover:text-blue-600">
                                        Điều khoản dịch vụ
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Cột 3 - Mạng xã hội */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                Kết nối với chúng tôi
                            </h3>
                            <div className="mt-3 flex space-x-4 text-gray-600 dark:text-gray-300">
                                <a href="#" className="hover:text-blue-600">
                                    <FaFacebook size={20} />
                                </a>
                                <a href="#" className="hover:text-pink-500">
                                    <FaInstagram size={20} />
                                </a>
                                <a href="#" className="hover:text-sky-500">
                                    <FaTwitter size={20} />
                                </a>
                                <a href="#" className="hover:text-red-600">
                                    <FaYoutube size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* Mini footer */}
                <div className="mt-6 border-t pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <p>© {new Date().getFullYear()} MyApp. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">Made with ❤️ by Team</p>
                </div>
            </div>
        </footer>
    );
}
