import { FaUserPlus } from "react-icons/fa";

export default function RightSidebar() {
  const friends = [
    { name: "Minh", avatar: "https://i.pravatar.cc/40?img=3" },
    { name: "Lan", avatar: "https://i.pravatar.cc/40?img=4" },
    { name: "Huy", avatar: "https://i.pravatar.cc/40?img=5" },
  ];

  return (
    <aside className="md:flex flex-col gap-4 w-64 p-3">
      <div>
        <h3 className="font-semibold text-gray-700 mb-2">Người liên hệ</h3>
        {friends.map((f) => (
          <div
            key={f.name}
            className="flex items-center gap-2 py-1 hover:bg-gray-100 hover:text-black rounded-md px-2"
          >
            <img src={f.avatar} alt={f.name} className="w-8 h-8 rounded-full" />
            <span>{f.name}</span>
          </div>
        ))}
      </div>

      <div className="text-black">
        <h3 className="font-semibold text-gray-700 mb-2">Lời mời kết bạn</h3>
        <div className="flex items-center gap-3 bg-white rounded-lg p-2 shadow-sm">
          <img
            src="https://i.pravatar.cc/40?img=6"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1">
            <p className="text-sm font-medium">Ngọc Anh</p>
            <button className="flex items-center gap-1 text-blue-600 text-sm mt-1 hover:underline">
              <FaUserPlus /> Chấp nhận
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
