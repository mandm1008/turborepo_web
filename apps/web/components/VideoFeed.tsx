"use client";

import { useEffect, useState } from "react";
import PostInput from "./PostInput";
import VideoPost, { VideoPostProps } from "./VideoPost";

export default function VideoFeed() {
    const [data, setData] = useState<VideoPostProps[]>([]);

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
                <VideoPost key={post.id} {...post} />
            ))}
        </main>
    );
}
