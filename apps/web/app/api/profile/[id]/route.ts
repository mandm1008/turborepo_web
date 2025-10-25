import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { UserModel, VideoModel } from "@/lib/db/models";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const user = await UserModel.findById(params.id).lean();
        if (!user)
            return NextResponse.json({ message: "Không tìm thấy user" }, { status: 404 });

        const videos = await VideoModel.find({ userId: user._id })
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                createdAt: user.createdAt,
            },
            videos: videos.map((v) => ({
                id: v._id,
                caption: v.caption,
                videoUrl: v.videoUrl,
                createdAt: v.createdAt,
                isYouTube: v.videoUrl.includes("https://youtube.com/"),
            })),
        });
    } catch (error: any) {
        console.error("Error loading profile:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
