"use client";

import { useState, useEffect } from "react";
import {
    FaFacebook,
    FaHome,
    FaBell,
    FaFacebookMessenger,
    FaPlus,
    FaUsers,
    FaStore,
    FaTv,
    FaBars,
    FaSearch,
    FaUser,
    FaCog,
    FaSignOutAlt,
} from "react-icons/fa";
import {
    useFloating,
    offset,
    flip,
    shift,
    useDismiss,
    useRole,
    useInteractions,
} from "@floating-ui/react";
import { signOut } from "next-auth/react";

export type HeaderProps = {
    type?: "full" | "mini";
};

export default function Header({ type = "full" }: HeaderProps) {
    const [openMenu, setOpenMenu] = useState<"msg" | "notif" | "account" | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [search, setSearch] = useState("");

    const floating = useFloating({
        placement: "bottom-end",
        middleware: [offset(6), flip(), shift()],
        open: !!openMenu,
        onOpenChange: () => setOpenMenu(null),
    });

    const dismiss = useDismiss(floating.context);
    const role = useRole(floating.context);
    const { getReferenceProps, getFloatingProps } = useInteractions([dismiss, role]);

    // Keyboard: Esc closes menus
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setOpenMenu(null);
                setIsMobileMenuOpen(false);
            }
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 w-full bg-white text-black border-b border-gray-200 ${type === "mini" ? "h-12" : "h-16"
                }`}
        >
            <div className="max-w-[1100px] mx-auto px-3 h-full flex items-center justify-between">
                {/* Left: Logo + Search */}
                <div className="flex items-center gap-3">
                    <a href="/" aria-label="Home" className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white">
                            <FaFacebook size={24} />
                        </div>
                        {type === "full" && (
                            <span className="sr-only sm:not-sr-only font-semibold text-lg">
                                Fakebook
                            </span>
                        )}
                    </a>
                    {type === "full" && (
                        <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-3 py-1 w-[200px] focus-within:ring-2 focus-within:ring-blue-400">
                            <FaSearch className="text-gray-600" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Tìm kiếm trên Fakebook"
                                className="ml-2 bg-transparent outline-none text-sm w-full"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch("")}
                                    className="ml-2 text-sm opacity-70 hover:opacity-100"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Center nav */}
                {type === "full" && (
                    <nav className="hidden md:flex gap-4 items-center">
                        <button className="px-5 py-2 rounded-md hover:bg-gray-100" title="Trang chủ">
                            <FaHome size={20} />
                        </button>
                        <button className="px-5 py-2 rounded-md hover:bg-gray-100" title="Watch">
                            <FaTv size={20} />
                        </button>
                        <button className="px-5 py-2 rounded-md hover:bg-gray-100" title="Marketplace">
                            <FaStore size={20} />
                        </button>
                        <button className="px-5 py-2 rounded-md hover:bg-gray-100" title="Bạn bè">
                            <FaUsers size={20} />
                        </button>
                    </nav>
                )}

                {/* Right actions */}
                <div className="flex items-center gap-2">
                    {type === "full" ? (
                        <>
                            <button
                                className="p-2 rounded-full hover:bg-gray-100"
                                title="Tạo"
                            >
                                <FaPlus />
                            </button>

                            {/* Messages */}
                            <button
                                {...getReferenceProps({ ref: floating.refs.setReference })}
                                onClick={() =>
                                    setOpenMenu(openMenu === "msg" ? null : "msg")
                                }
                                className="p-2 rounded-full hover:bg-gray-100"
                                title="Tin nhắn"
                            >
                                <FaFacebookMessenger />
                            </button>
                            {openMenu === "msg" && (
                                <div
                                    ref={floating.refs.setFloating}
                                    style={floating.floatingStyles}
                                    {...getFloatingProps({})}
                                    className="w-80 bg-white border rounded-md shadow-lg p-3 z-50"
                                >
                                    <p className="text-sm font-medium">Tin nhắn gần đây</p>
                                    <ul className="mt-2 text-sm">
                                        <li className="py-2 border-b">
                                            <FaUser className="inline-block mr-2 text-gray-500" />
                                            Bạn: Xin chào 👋
                                        </li>
                                        <li className="py-2 border-b">
                                            <FaUser className="inline-block mr-2 text-gray-500" />
                                            Lan: Hôm nay thế nào?
                                        </li>
                                        <li className="py-2">
                                            <FaUser className="inline-block mr-2 text-gray-500" />
                                            Minh: Gửi file đây
                                        </li>
                                    </ul>
                                </div>
                            )}

                            {/* Notifications */}
                            <button
                                {...getReferenceProps({ ref: floating.refs.setReference })}
                                onClick={() =>
                                    setOpenMenu(openMenu === "notif" ? null : "notif")
                                }
                                className="relative p-2 rounded-full hover:bg-gray-100"
                                title="Thông báo"
                            >
                                <FaBell />
                                <span className="absolute top-0 right-0 -mt-1 -mr-1 text-xs bg-red-600 text-white rounded-full px-1.5">
                                    3
                                </span>
                            </button>
                            {openMenu === "notif" && (
                                <div
                                    ref={floating.refs.setFloating}
                                    style={floating.floatingStyles}
                                    {...getFloatingProps({})}
                                    className="w-80 bg-white border rounded-md shadow-lg p-3 z-50"
                                >
                                    <p className="text-sm font-medium">Thông báo mới</p>
                                    <ul className="mt-2 text-sm">
                                        <li className="py-2 border-b">
                                            <FaUser className="inline-block mr-2 text-gray-500" />
                                            Huy đã thích bài viết của bạn
                                        </li>
                                        <li className="py-2 border-b">
                                            <FaUser className="inline-block mr-2 text-gray-500" />
                                            Minh đã bình luận
                                        </li>
                                        <li className="py-2">
                                            <FaUser className="inline-block mr-2 text-gray-500" />
                                            Lan đã gửi lời mời kết bạn
                                        </li>
                                    </ul>
                                </div>
                            )}

                            {/* Account */}
                            <button
                                {...getReferenceProps({ ref: floating.refs.setReference })}
                                onClick={() =>
                                    setOpenMenu(openMenu === "account" ? null : "account")
                                }
                                className="flex items-center gap-2 rounded-full hover:bg-gray-100 px-2 py-1"
                            >
                                <img
                                    src="/turborepo.svg"
                                    alt="User avatar"
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <span className="hidden md:inline-block text-sm font-medium">
                                    Người dùng
                                </span>
                            </button>
                            {openMenu === "account" && (
                                <div
                                    ref={floating.refs.setFloating}
                                    style={floating.floatingStyles}
                                    {...getFloatingProps({})}
                                    className="w-68 bg-white border rounded-md shadow-lg p-2 z-50"
                                >
                                    <a
                                        href="#"
                                        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
                                    >
                                        <FaUser />
                                        <span>Trang cá nhân</span>
                                    </a>
                                    <a
                                        href="#"
                                        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
                                    >
                                        <FaCog />
                                        <span>Cài đặt & quyền riêng tư</span>
                                    </a>
                                    <button
                                        onClick={() => signOut({ callbackUrl: "/login" })}
                                        className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                                    >
                                        <FaSignOutAlt />
                                        <span>Đăng xuất</span>
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-full hover:bg-gray-100"
                        >
                            <FaBars />
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="max-w-[1100px] mx-auto px-3 py-2 flex gap-2">
                        <a className="flex-1 flex items-center justify-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100">
                            <FaHome /> Trang chủ
                        </a>
                        <a className="flex-1 flex items-center justify-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100">
                            <FaFacebookMessenger /> Tin nhắn
                        </a>
                        <a className="flex-1 flex items-center justify-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100">
                            <FaBell /> Thông báo
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
