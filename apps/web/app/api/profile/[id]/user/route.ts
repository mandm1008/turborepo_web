import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/lib/db/models";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id: userId } = await params;

        const user = await UserModel.findById(userId).lean();
        if (!user)
            return NextResponse.json(
                { message: "Không tìm thấy user" },
                { status: 404 }
            );

        return NextResponse.json({
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            createdAt: user.createdAt,
        });
    } catch (error: any) {
        console.error("❌ Error loading user:", error);
        return NextResponse.json(
            { error: "Lỗi khi tải thông tin user" },
            { status: 500 }
        );
    }
}
