"use client";

interface ProfileHeaderProps {
  name: string;
  email: string;
  avatar: string;
  cover?: string;
}

export default function ProfileHeader({
  name,
  email,
  avatar,
  cover,
}: ProfileHeaderProps) {
  return (
    <div className="relative bg-gray-900 rounded-xl overflow-hidden mb-4">
      <img
        src={cover || "https://picsum.photos/900/250"}
        alt="cover"
        className="w-full h-60 object-cover"
      />
      <div className="absolute bottom-4 left-6 flex items-end gap-4">
        <img
          src={avatar}
          alt="avatar"
          className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
        />
        <div className="text-white drop-shadow-lg mb-2">
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-sm opacity-90">{email}</p>
        </div>
      </div>
    </div>
  );
}
