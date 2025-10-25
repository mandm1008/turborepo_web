"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { PostInput } from "../inputs";
import VideoPost, { VideoPostProps } from "./VideoPost";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function FeedArea({ apiRoute = "/api/videos", hasPost = true }: { apiRoute?: string; hasPost?: boolean }) {
    const [page, setPage] = useState(1);
    const [videos, setVideos] = useState<VideoPostProps[]>([]);
    const [isMuted, setIsMuted] = useState(true);
    const [hasMore, setHasMore] = useState(true);

    const { data, error, isValidating } = useSWR(
        hasMore ? `${apiRoute}?page=${page}&limit=3` : null,
        fetcher,
        { revalidateOnFocus: false }
    );

    useEffect(() => {
        if (!data || !Array.isArray(data.items)) return;

        setVideos((prev) => {
            const newItems = data.items.filter(
                (item: VideoPostProps) => !prev.some((p) => p.id === item.id)
            );
            return [...prev, ...newItems];
        });

        setHasMore(data.hasMore);
    }, [data]);

    useEffect(() => {
        const handleScroll = () => {
            const nearBottom =
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
            if (nearBottom && !isValidating && hasMore) {
                setPage((prev) => prev + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isValidating, hasMore]);

    if (error) {
        return (
            <p className="text-center text-red-500 py-6">
                Lỗi tải dữ liệu: {error.message}
            </p>
        );
    }

    return (
        <main className="max-w-xl mx-auto mt-6">
            {hasPost && <PostInput />}

            {videos.map((post) => (
                <VideoPost
                    key={post.id}
                    {...post}
                    isMuted={isMuted}
                    setIsMuted={setIsMuted}
                />
            ))}

            {isValidating && (
                <p className="text-center text-gray-500 py-4">Đang tải...</p>
            )}
            {!hasMore && !isValidating && videos.length > 0 && (
                <p className="text-center text-gray-400 py-4">Hết video rồi 🎬</p>
            )}
        </main>
    );
}
