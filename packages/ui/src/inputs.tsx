"use client";

import { useState } from "react";

export function PostInput() {
    const [text, setText] = useState("");

    return (
        <div className="bg-gray-900 rounded-xl shadow p-4 mb-6">
            <div className="flex items-center gap-3">
                <img
                    src="https://i.pravatar.cc/50"
                    alt="me"
                    className="w-10 h-10 rounded-full"
                />
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Đăng cảm nghĩ hoặc video..."
                    className="flex-1 rounded-full bg-gray-100 dark:bg-gray-800 px-4 py-2 outline-none"
                />
            </div>
        </div>
    );
}
