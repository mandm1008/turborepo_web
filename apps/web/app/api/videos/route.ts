import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { VideoModel } from "@/lib/db/models";
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "3", 10);

        const skip = (page - 1) * limit;

        const videos = await VideoModel.find({})
            .populate("userId", "_id name avatar")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await VideoModel.countDocuments();
        const hasMore = skip + videos.length < total;

        const items = videos.map((v) => ({
            id: v._id.toString(),
            user: {
                id: (v as any).userId?._id,
                name: (v as any).userId?.name,
                avatar: (v as any).userId?.avatar,
            },
            videoUrl: v.videoUrl,
            caption: v.caption,
            likes: v.likesCount || 0,
            comments: v.commentsCount || 0,
            shares: v.sharesCount || 0,
        }));

        return NextResponse.json({
            page,
            limit,
            total,
            hasMore,
            items,
        });
    } catch (error: any) {
        console.error("❌ Error fetching videos:", error);
        return NextResponse.json(
            { error: "Failed to load videos from DB" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const contentType = req.headers.get("content-type");
        let videoUrl = "";
        let caption = "";
        let tags: string[] = [];
        let visibility = "public";
        let isYouTube = false;

        if (contentType?.includes("multipart/form-data")) {
            const formData = await req.formData();

            caption = (formData.get("caption") as string) || "";
            visibility = (formData.get("visibility") as string) || "public";
            tags = JSON.parse((formData.get("tags") as string) || "[]");

            const youtubeUrl = (formData.get("youtubeUrl") as string) || "";
            const file = formData.get("video") as File | null;

            if (youtubeUrl) {
                videoUrl = youtubeUrl;
                isYouTube = true;
            }
            else if (file) {
                const buffer = Buffer.from(await file.arrayBuffer());
                const uploadDir = path.join(process.cwd(), "public", "uploads");
                if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

                const filename = `${Date.now()}_${file.name}`;
                const filepath = path.join(uploadDir, filename);

                await fs.promises.writeFile(filepath, buffer);
                videoUrl = `/uploads/${filename}`;
            }
            else {
                return NextResponse.json({ error: "Missing YouTube URL or video file" }, { status: 400 });
            }
        }
        else if (contentType?.includes("application/json")) {
            const data = await req.json();
            videoUrl = data.youtubeUrl || data.videoUrl;
            caption = data.caption || "";
            tags = data.tags || [];
            visibility = data.visibility || "public";

            const youtubeRegex =
                /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|shorts\/)?([a-zA-Z0-9_-]{11})/;
            isYouTube = youtubeRegex.test(videoUrl);
        }
        else {
            return NextResponse.json({ error: "Unsupported Content-Type" }, { status: 415 });
        }

        const video = await VideoModel.create({
            userId: (session.user as any).id,
            videoUrl,
            caption,
            tags,
            visibility,
            isYouTube,
        });

        return NextResponse.json({ success: true, video }, { status: 201 });
    } catch (error) {
        console.error("❌ Error uploading video:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
