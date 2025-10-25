"use client";

import { useRouter } from "next/navigation";

type AvatarProps = {
    avatar: string;
    name: string;
    userId: string; // id dùng để điều hướng trang cá nhân
};

export default function Avatar({ avatar, name, userId }: AvatarProps) {
    const router = useRouter();

    const goToProfile = () => {
        router.push(`/profile/${userId}`);
    };

    return (
        <button
            onClick={goToProfile}
            className="flex items-center gap-2 rounded-full px-2 py-1"
        >
            <img
                src={avatar}
                alt={name}
                className="w-10 h-10 rounded-full object-cover"
            />
            <span className="hidden md:inline-block text-sm font-medium">{name}</span>
        </button>
    );
}
