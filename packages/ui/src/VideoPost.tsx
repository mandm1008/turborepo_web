"use client";
import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { FaHeart, FaRegCommentDots, FaShare, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

export interface VideoPostProps {
    id: number;
    user: {
        name: string;
        avatar: string;
    };
    videoUrl: string;
    caption: string;
    likes: number;
    comments: number;
    shares: number;
    isMuted?: boolean;
    setIsMuted?: (value: boolean) => void;
}

export default function VideoPost({
    user,
    videoUrl,
    caption,
    likes,
    comments,
    shares,
    isMuted,
    setIsMuted,
}: VideoPostProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsPlaying(true);
                    } else {
                        setIsPlaying(false);
                    }
                });
            },
            { threshold: 0.8 } // 80% video nằm trong viewport
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={videoRef}
            className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden mb-6"
        >
            {/* Header */}
            <div className="flex items-center gap-3 p-4">
                <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                />
                <p className="font-semibold">{user.name}</p>
            </div>

            {/* Video */}
            <div className="w-full aspect-video bg-black relative">
                <ReactPlayer
                    src={videoUrl}
                    width="100%"
                    height="100%"
                    playing={isPlaying}
                    muted={isMuted}
                    controls={false}
                />

                <button
                    onClick={() => setIsMuted && setIsMuted(!isMuted)}
                    className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-full"
                >
                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
            </div>

            {/* Caption */}
            <p className="p-4 text-gray-700">{caption}</p>

            {/* Actions */}
            <div className="flex justify-around py-3 border-t text-gray-600">
                <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center gap-2 ${isLiked ? "text-red-500" : "hover:text-red-400"
                        }`}
                >
                    <FaHeart /> {isLiked ? likes + 1 : likes}
                </button>
                <div className="flex items-center gap-2 hover:text-blue-500">
                    <FaRegCommentDots /> {comments}
                </div>
                <div className="flex items-center gap-2 hover:text-green-500">
                    <FaShare /> {shares}
                </div>
            </div>
        </div>
    );
}
