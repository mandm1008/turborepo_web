import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "3", 10);

        const filePath = path.join(process.cwd(), "data", "videos.json");
        const raw = fs.readFileSync(filePath, "utf-8");
        const videos = JSON.parse(raw);

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const items = videos.slice(startIndex, endIndex);

        const hasMore = endIndex < videos.length;

        return NextResponse.json({
            page,
            limit,
            total: videos.length,
            hasMore,
            items,
        });
    } catch (error: any) {
        console.error("❌ Error reading videos.json:", error);
        return NextResponse.json(
            { error: "Failed to load videos data" },
            { status: 500 }
        );
    }
}
