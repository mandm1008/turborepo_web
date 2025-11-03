"use client";

import { use } from "react";
import useSWR from "swr";
import { ProfileHeader } from "@repo/ui/profile";
import { FeedArea } from "@repo/ui/videos";
import { useSession } from "next-auth/react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: session } = useSession();

  const {
    data: user,
    error,
    isLoading,
  } = useSWR(`/api/profile/${id}/user`, fetcher);

  if (isLoading) return <p className="text-center mt-10">⏳ Đang tải...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">❌ Lỗi tải dữ liệu</p>;
  if (!user?.id)
    return <p className="text-center mt-10">Không tìm thấy người dùng</p>;

  return (
    <main className="max-w-2xl mx-auto mt-4 px-3">
      <ProfileHeader name={user.name} email={user.email} avatar={user.avatar} />

      <section className="mt-16 space-y-6">
        <FeedArea
          apiRoute={`/api/profile/${id}/videos`}
          hasPost={session?.user?.id === user.id}
        />
      </section>
    </main>
  );
}
