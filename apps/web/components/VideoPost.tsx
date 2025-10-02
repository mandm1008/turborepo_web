"use client";
import { useState } from "react";
import ReactPlayer from "react-player";
import { FaHeart, FaRegCommentDots, FaShare } from "react-icons/fa";

export interface VideoPostProps {
    id: number,
    user: {
        name: string;
        avatar: string;
    };
    videoUrl: string;
    caption: string;
    likes: number;
    comments: number;
    shares: number;
}

export default function VideoPost({
    user,
    videoUrl,
    caption,
    likes,
    comments,
    shares,
}: VideoPostProps) {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden mb-6">
            {/* Header */}
            <div className="flex items-center gap-3 p-4">
                <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                />
                <p className="font-semibold">{user.name}</p>
            </div>

            {/* Video (ReactPlayer hỗ trợ cả YouTube & file mp4) */}
            <div className="w-full aspect-video bg-black">
                <ReactPlayer
                    src={videoUrl}
                    width="100%"
                    height="100%"
                    controls
                />
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
