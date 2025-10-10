"use client";

import { useEffect, useState } from "react";
import { PostInput } from "./inputs";
import VideoPost, { VideoPostProps } from "./VideoPost";

export default function VideoFeed() {
    const [data, setData] = useState<VideoPostProps[]>([]);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        fetch('/api/videos')
            .then(value => value.json())
            .then(data => setData(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <main className="max-w-xl mx-auto mt-6">
            <PostInput />
            {data.map((post) => (
                <VideoPost
                    key={post.id}
                    {...post}
                    isMuted={isMuted}
                    setIsMuted={setIsMuted}
                />
            ))}
        </main>
    );
}
