import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
    const filePath = path.join(process.cwd(), "data", "videos.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const videos = JSON.parse(data);

    return NextResponse.json(videos);
}
