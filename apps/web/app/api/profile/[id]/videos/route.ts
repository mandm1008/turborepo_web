import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { VideoModel } from "@/lib/db/models";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id: userId } = await params;

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "5", 10);
        const skip = (page - 1) * limit;

        const total = await VideoModel.countDocuments({ userId });

        const videos = await VideoModel.find({ userId })
            .populate("userId", "_id name avatar") // chỉ lấy name, avatar của user
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const hasMore = skip + videos.length < total;

        const items = videos.map((v) => ({
            id: v._id.toString(),
            user: {
                id: (v as any).userId?._id?.toString() || userId,
                name: (v as any).userId?.name || "Người dùng ẩn danh",
                avatar: (v as any).userId?.avatar || "/default-avatar.png",
            },
            videoUrl: v.videoUrl,
            caption: v.caption,
            likes: v.likesCount || 0,
            comments: v.commentsCount || 0,
            shares: v.sharesCount || 0,
            createdAt: v.createdAt,
            isYouTube: /(youtube\.com|youtu\.be)/.test(v.videoUrl),
        }));

        return NextResponse.json({
            page,
            limit,
            total,
            hasMore,
            items,
        });
    } catch (error: any) {
        console.error("❌ Error loading videos:", error);
        return NextResponse.json(
            { error: "Lỗi khi tải danh sách video" },
            { status: 500 }
        );
    }
}
