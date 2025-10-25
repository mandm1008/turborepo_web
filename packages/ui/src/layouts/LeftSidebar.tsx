"use client";

import Link from "next/link";
import {
    FaUser,
    FaUsers,
    FaStore,
    FaTv,
    FaClock,
    FaBookmark,
    FaChevronDown,
} from "react-icons/fa";
import { useSession } from "next-auth/react";

export default function LeftSidebar() {
    const { data: session } = useSession();
    const user = session?.user;

    const items = [
        { icon: <FaUser />, label: "Trang cá nhân", href: `/profile/${user?.id}` },
        { icon: <FaUsers />, label: "Bạn bè", href: "/friends" },
        { icon: <FaStore />, label: "Marketplace", href: "/marketplace" },
        { icon: <FaTv />, label: "Watch", href: "/watch" },
        { icon: <FaClock />, label: "Kỷ niệm", href: "/memories" },
        { icon: <FaBookmark />, label: "Đã lưu", href: "/saved" },
        { icon: <FaChevronDown />, label: "Xem thêm", href: "#" },
    ];

    return (
        <aside className="flex flex-col gap-2 w-64 p-3 text-white">
            {items.map((item) => (
                <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100 hover:text-black text-left transition"
                >
                    <span className="text-blue-600">{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                </Link>
            ))}
        </aside>
    );
}
