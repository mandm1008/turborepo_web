import { NextResponse } from "next/server";
import { connectDB } from "@/db";
import { VideoModel } from "@/db/models";

export async function GET(req: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "3", 10);

        const skip = (page - 1) * limit;

        // ⚡ Lấy video có user liên kết
        const videos = await VideoModel.find({})
            .populate("userId", "name avatar") // chỉ lấy name + avatar của user
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await VideoModel.countDocuments();
        const hasMore = skip + videos.length < total;

        const items = videos.map((v) => ({
            id: v._id.toString(),
            user: {
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
