import { FaUser, FaUsers, FaStore, FaTv, FaClock, FaBookmark, FaChevronDown } from "react-icons/fa";

export default function LeftSidebar() {
    const items = [
        { icon: <FaUser />, label: "Trang cá nhân" },
        { icon: <FaUsers />, label: "Bạn bè" },
        { icon: <FaStore />, label: "Marketplace" },
        { icon: <FaTv />, label: "Watch" },
        { icon: <FaClock />, label: "Kỷ niệm" },
        { icon: <FaBookmark />, label: "Đã lưu" },
        { icon: <FaChevronDown />, label: "Xem thêm" },
    ];

    return (
        <aside className="md:flex flex-col gap-2 w-64 p-3 text-white">
            {items.map((item) => (
                <button
                    key={item.label}
                    className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100 hover:text-black text-left"
                >
                    <span className="text-blue-600">{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                </button>
            ))}
        </aside>
    );
}
